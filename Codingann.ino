#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <WiFi.h>
#include <HTTPClient.h>

//  WIFI CONFIG 
const char* ssid = "A56 milik Hima";               
const char* password = "@Hima1234";         
//iniaiasi url
String serverBaseUrl = "http://10.75.215.159:8000/input-rfid"; 

// PIN CONFIG 
#define SS_PIN       5     
#define RST_PIN      0     
#define FAN_PIN      14    
#define SELENOID_PIN 26    
#define BUZZER_PIN   27    

//  OBJECT 
MFRC522 mfrc522(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 16, 2);   

// KONFIG 
const bool RELAY_ACTIVE_LOW = true; 

// Var Non-Blocking Fan
unsigned long lastFanToggle = 0;
bool fanState = false; 

// Var WiFi Check
unsigned long lastWifiCheck = 0;
bool isWifiConnected = false;

// Helper
void setDevice(int pin, bool turnOn) {
  if (RELAY_ACTIVE_LOW) digitalWrite(pin, turnOn ? LOW : HIGH); 
  else digitalWrite(pin, turnOn ? HIGH : LOW); 
}

void beep(int count = 1) {
  for (int i=0; i<count; i++) {
    digitalWrite(BUZZER_PIN, HIGH); delay(100);
    digitalWrite(BUZZER_PIN, LOW); delay(100);
  }
}

void showLCD(String l1, String l2=""){
  lcd.clear(); lcd.setCursor(0,0); lcd.print(l1); lcd.setCursor(0,1); lcd.print(l2);
}

void setup() {
  Serial.begin(115200);

  // Init Pins
  pinMode(FAN_PIN, OUTPUT);
  pinMode(SELENOID_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  
  // Matikan semua dulu
  setDevice(FAN_PIN, false);
  setDevice(SELENOID_PIN, false);
  digitalWrite(BUZZER_PIN, LOW);

  // Init LCD
  lcd.init(); lcd.backlight();
  showLCD("Booting System", "Fan Starting...");
  
  // Init RFID
  SPI.begin();
  mfrc522.PCD_Init();

  // --- START WIFI  ---
  WiFi.begin(ssid, password);
  delay(1000); 
}

void loop() {
  unsigned long currentMillis = millis();

  // 1. LOGIKA KIPAS 
  if (currentMillis - lastFanToggle >= 30000) { 
    lastFanToggle = currentMillis;
    fanState = !fanState; 
    setDevice(FAN_PIN, fanState);
  }

  // 2. CEK WIFI  
  // Cek koneksi tiap 5 detik
  if (currentMillis - lastWifiCheck >= 5000) {
      lastWifiCheck = currentMillis;
      if (WiFi.status() == WL_CONNECTED) {
          if (!isWifiConnected) {
             isWifiConnected = true;
             showLCD("WiFi OK", WiFi.localIP().toString());
             beep(1);
             delay(1500); // Tahan dikit infonya
             showLCD("Sistem Absensi", "Tempel Kartu...");
          }
      } else {
          isWifiConnected = false;
          // Tampilan saat wifi putus
          showLCD("Menunggu WiFi...", "Connecting...");
      }
  }

  // 3. LOGIKA ABSENSI 
  // Hanya jalan jka WiFi sudah OK
  if (!isWifiConnected) return;

  if (!mfrc522.PICC_IsNewCardPresent()) return;
  if (!mfrc522.PICC_ReadCardSerial()) return;

  // Baca UID
  String uidString = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    if (mfrc522.uid.uidByte[i] < 0x10) uidString += "0";
    uidString += String(mfrc522.uid.uidByte[i], HEX);
  }
  uidString.toUpperCase();

  showLCD("Memproses...", uidString);
  beep(1);

  HTTPClient http;
  http.begin(serverBaseUrl + "?uid=" + uidString);
  
  int httpCode = http.GET();
  if (httpCode == 200) {
      String payload = http.getString();
      
      if (payload.indexOf("SUCCESS") > 0) {
           showLCD("Hadir!", "Pintu Terbuka");
           
           // Buka Pintu
           setDevice(SELENOID_PIN, true); 
           beep(1);
           
           delay(3000); // Tahan 3 Detik
           
           setDevice(SELENOID_PIN, false); // Tutup
           
      } else if (payload.indexOf("ALREADY") > 0) {
           showLCD("Sdh Hadir", "Pintu Terbuka");
           setDevice(SELENOID_PIN, true);
           beep(2);
           
           delay(2000); 
           
           setDevice(SELENOID_PIN, false);
      } else {
           // Error lain (misal User/Jadwal tidak ditemukan)
           if (payload.indexOf("Tidak Dikenal") > 0) showLCD("Gagal!", "Unregistered");
           else if (payload.indexOf("Tidak Ada Jadwal") > 0) showLCD("Gagal!", "No Schedule");
           else showLCD("Gagal!", "Cek Server");
           
           beep(3);
           delay(2000);
      }
  } else {
      showLCD("Conn Error", "Cek Server");
      beep(3);
      delay(2000);
  }
  http.end();

  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
  
  showLCD("Sistem Absensi", "Tempel Kartu...");
}