# Sistem Absensi Siswa SMP GIKI 2 Surabaya

## Deskripsi Project
Sistem absensi siswa berbasis web untuk SMP GIKI 2 Surabaya yang memungkinkan guru untuk mengelola absensi siswa secara digital. Sistem ini dibangun menggunakan HTML, CSS, JavaScript, dan Bootstrap 5.

## Fitur Utama

### 1. **Halaman Login**
- Form login dengan validasi
- Pilihan role: Siswa, Guru, Tata Usaha
- Proteksi halaman dengan session management
- Redirect otomatis jika sudah login

### 2. **Dashboard**
- Tampilan overview mata pelajaran
- Card mata pelajaran dengan jadwal
- Navigasi sidebar yang responsif
- Informasi user yang sedang login

### 3. **Halaman Absensi**
- Input absensi siswa per kelas dan mata pelajaran
- Status kehadiran: Hadir, Tidak Hadir, Terlambat, Izin
- Input waktu absensi dan keterangan
- Statistik real-time kehadiran
- Simpan data ke localStorage
- Load data absensi yang sudah tersimpan

### 4. **Manajemen Kelas**
- CRUD data siswa lengkap
- Filter dan pencarian siswa
- Statistik kelas (total siswa, aktif, tidak aktif)
- Export data (Excel/PDF) - coming soon
- Validasi NIS unik

## Struktur File

```
Absensi-Giki-2-SMP-main/
├── login.html              # Halaman login
├── dashboard.html          # Dashboard utama
├── absensi.html           # Halaman absensi siswa
├── kelas.html             # Manajemen kelas
├── coba.css               # Styling utama
├── css/                   # Bootstrap CSS files
├── js/                    # JavaScript files
│   ├── absensi.js         # Logic absensi
│   └── kelas.js           # Logic manajemen kelas
└── README.md              # Dokumentasi ini
```

## Cara Penggunaan

### 1. **Login**
- Username: `admin`
- Password: `admin`
- Pilih role sesuai kebutuhan

### 2. **Mengelola Data Siswa**
1. Buka halaman "Kelas"
2. Klik "Tambah Siswa" untuk menambah siswa baru
3. Isi data lengkap siswa
4. Gunakan tombol Edit/Hapus untuk mengelola data

### 3. **Mengisi Absensi**
1. Buka halaman "Absensi"
2. Pilih kelas, mata pelajaran, dan tanggal
3. Pilih status kehadiran untuk setiap siswa
4. Klik "Simpan Absensi" untuk menyimpan

## Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dan responsive design
- **JavaScript (ES6+)** - Logic aplikasi
- **Bootstrap 5** - Framework CSS dan komponen UI
- **Bootstrap Icons** - Icon library
- **LocalStorage** - Penyimpanan data lokal

## Fitur Responsive

- **Mobile First Design** - Optimized untuk smartphone
- **Tablet Support** - Layout yang sesuai untuk tablet
- **Desktop Enhancement** - Fitur tambahan untuk desktop
- **Touch Friendly** - Tombol dan elemen yang mudah disentuh

## Data yang Disimpan

### LocalStorage Keys:
- `userLogin` - Data user yang sedang login
- `dataSiswaLengkap` - Data lengkap semua siswa
- `absensi_[kelas]_[mapel]_[tanggal]` - Data absensi per sesi

## Pengembangan Selanjutnya

### Fitur yang Dapat Ditambahkan:
1. **Backend Integration** - Koneksi ke database server
2. **Export/Import** - Export data ke Excel/PDF
3. **Laporan Absensi** - Generate laporan bulanan/tahunan
4. **Notifikasi** - Email/SMS untuk orang tua
5. **QR Code** - Absensi dengan scan QR
6. **Multi-user** - Support untuk multiple guru
7. **Backup Data** - Sistem backup otomatis

## Cara Menjalankan

1. Download semua file project
2. Buka `login.html` di browser
3. Login dengan kredensial default
4. Mulai menggunakan sistem

## Kontribusi

Project ini dikembangkan untuk keperluan pembelajaran dan dapat dikembangkan lebih lanjut sesuai kebutuhan sekolah.

## Lisensi

Project ini dibuat untuk keperluan edukasi dan dapat digunakan secara bebas untuk tujuan pembelajaran.

---

**Developer:** Kevin Setiawan  
**Institution:** SMP GIKI 2 Surabaya  
**Version:** 1.0.0  
**Last Updated:** 2025
