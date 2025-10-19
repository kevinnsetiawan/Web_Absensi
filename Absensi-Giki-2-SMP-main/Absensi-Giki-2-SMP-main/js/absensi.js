// Fungsi untuk mendapatkan data siswa dari localStorage
function getDataSiswa() {
    const dataTersimpan = localStorage.getItem('dataSiswaLengkap');
    if (dataTersimpan) {
        return JSON.parse(dataTersimpan);
    }
    return [];
}

// Fungsi untuk mendapatkan data siswa berdasarkan kelas
function getDataSiswaByKelas(kelas) {
    const dataSiswaLengkap = getDataSiswa();
    return dataSiswaLengkap.filter(siswa => siswa.kelas === kelas && siswa.status === 'aktif');
}

// Data absensi yang sedang dikerjakan
let absensiSementara = {};

// Inisialisasi halaman
document.addEventListener('DOMContentLoaded', function() {
    // Set tanggal hari ini
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tanggalAbsensi').value = today;
    
    // Event listener untuk perubahan kelas
    document.getElementById('selectKelas').addEventListener('change', loadSiswa);
    
    // Event listener untuk perubahan mata pelajaran
    document.getElementById('selectMapel').addEventListener('change', updateDetail);
    
    // Event listener untuk perubahan tanggal
    document.getElementById('tanggalAbsensi').addEventListener('change', updateDetail);
});

// Memuat daftar siswa berdasarkan kelas yang dipilih
function loadSiswa() {
    const kelas = document.getElementById('selectKelas').value;
    const tabelSiswa = document.getElementById('tabelSiswa');
    
    if (!kelas) {
        tabelSiswa.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Pilih kelas terlebih dahulu</td></tr>';
        return;
    }
    
    const siswa = getDataSiswaByKelas(kelas);
    let html = '';
    
    if (siswa.length === 0) {
        html = '<tr><td colspan="6" class="text-center text-muted">Tidak ada siswa aktif di kelas ini</td></tr>';
    } else {
        siswa.forEach((siswa, index) => {
            const siswaId = `${kelas}_${siswa.id}`;
            const absensiData = absensiSementara[siswaId] || { status: '', waktu: '', keterangan: '' };
            
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${siswa.nama}</td>
                    <td>${siswa.nis}</td>
                    <td>
                        <select class="form-select form-select-sm" onchange="updateAbsensi('${siswaId}', this.value)">
                            <option value="">Pilih Status</option>
                            <option value="hadir" ${absensiData.status === 'hadir' ? 'selected' : ''}>Hadir</option>
                            <option value="tidak-hadir" ${absensiData.status === 'tidak-hadir' ? 'selected' : ''}>Tidak Hadir</option>
                            <option value="terlambat" ${absensiData.status === 'terlambat' ? 'selected' : ''}>Terlambat</option>
                            <option value="izin" ${absensiData.status === 'izin' ? 'selected' : ''}>Izin</option>
                        </select>
                    </td>
                    <td>
                        <input type="time" class="form-control form-control-sm" 
                               value="${absensiData.waktu}" 
                               onchange="updateWaktuAbsensi('${siswaId}', this.value)"
                               ${absensiData.status === 'tidak-hadir' ? 'disabled' : ''}>
                    </td>
                    <td>
                        <input type="text" class="form-control form-control-sm" 
                               placeholder="Keterangan" 
                               value="${absensiData.keterangan}"
                               onchange="updateKeterangan('${siswaId}', this.value)">
                    </td>
                </tr>
            `;
        });
    }
    
    tabelSiswa.innerHTML = html;
    updateStatistik();
}

// Update data absensi siswa
function updateAbsensi(siswaId, status) {
    if (!absensiSementara[siswaId]) {
        absensiSementara[siswaId] = {};
    }
    
    absensiSementara[siswaId].status = status;
    
    // Jika status tidak hadir, disable input waktu
    const row = event.target.closest('tr');
    const waktuInput = row.querySelector('input[type="time"]');
    if (status === 'tidak-hadir') {
        waktuInput.disabled = true;
        waktuInput.value = '';
        absensiSementara[siswaId].waktu = '';
    } else {
        waktuInput.disabled = false;
        if (!absensiSementara[siswaId].waktu) {
            absensiSementara[siswaId].waktu = new Date().toTimeString().slice(0, 5);
            waktuInput.value = absensiSementara[siswaId].waktu;
        }
    }
    
    updateStatistik();
}

// Update waktu absensi
function updateWaktuAbsensi(siswaId, waktu) {
    if (!absensiSementara[siswaId]) {
        absensiSementara[siswaId] = {};
    }
    absensiSementara[siswaId].waktu = waktu;
}

// Update keterangan
function updateKeterangan(siswaId, keterangan) {
    if (!absensiSementara[siswaId]) {
        absensiSementara[siswaId] = {};
    }
    absensiSementara[siswaId].keterangan = keterangan;
}

// Update statistik absensi
function updateStatistik() {
    const stats = {
        hadir: 0,
        tidakHadir: 0,
        terlambat: 0,
        izin: 0
    };
    
    Object.values(absensiSementara).forEach(absensi => {
        if (absensi.status) {
            stats[absensi.status]++;
        }
    });
    
    document.getElementById('totalHadir').textContent = stats.hadir;
    document.getElementById('totalTidakHadir').textContent = stats.tidakHadir;
    document.getElementById('totalTerlambat').textContent = stats.terlambat;
    document.getElementById('totalIzin').textContent = stats.izin;
}

// Update detail untuk modal konfirmasi
function updateDetail() {
    const kelas = document.getElementById('selectKelas').value;
    const mapel = document.getElementById('selectMapel').value;
    const tanggal = document.getElementById('tanggalAbsensi').value;
    
    document.getElementById('detailKelas').textContent = kelas || 'Belum dipilih';
    document.getElementById('detailMapel').textContent = mapel || 'Belum dipilih';
    document.getElementById('detailTanggal').textContent = tanggal || 'Belum dipilih';
}

// Simpan absensi
function simpanAbsensi() {
    const kelas = document.getElementById('selectKelas').value;
    const mapel = document.getElementById('selectMapel').value;
    const tanggal = document.getElementById('tanggalAbsensi').value;
    
    if (!kelas || !mapel || !tanggal) {
        alert('Mohon lengkapi semua field (Kelas, Mata Pelajaran, dan Tanggal)');
        return;
    }
    
    // Cek apakah ada data absensi
    const adaDataAbsensi = Object.values(absensiSementara).some(absensi => absensi.status);
    if (!adaDataAbsensi) {
        alert('Tidak ada data absensi untuk disimpan');
        return;
    }
    
    updateDetail();
    
    // Tampilkan modal konfirmasi
    const modal = new bootstrap.Modal(document.getElementById('modalKonfirmasi'));
    modal.show();
}

// Proses simpan absensi
function prosesSimpanAbsensi() {
    const kelas = document.getElementById('selectKelas').value;
    const mapel = document.getElementById('selectMapel').value;
    const tanggal = document.getElementById('tanggalAbsensi').value;
    
    // Simpan ke localStorage
    const key = `absensi_${kelas}_${mapel}_${tanggal}`;
    const dataAbsensi = {
        kelas: kelas,
        mataPelajaran: mapel,
        tanggal: tanggal,
        waktuSimpan: new Date().toISOString(),
        data: absensiSementara
    };
    
    localStorage.setItem(key, JSON.stringify(dataAbsensi));
    
    // Tutup modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalKonfirmasi'));
    modal.hide();
    
    // Tampilkan notifikasi sukses
    alert('Data absensi berhasil disimpan!');
    
    // Reset form
    resetAbsensi();
}

// Reset absensi
function resetAbsensi() {
    absensiSementara = {};
    document.getElementById('selectKelas').value = '';
    document.getElementById('selectMapel').value = '';
    document.getElementById('tanggalAbsensi').value = new Date().toISOString().split('T')[0];
    
    const tabelSiswa = document.getElementById('tabelSiswa');
    tabelSiswa.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Pilih kelas terlebih dahulu</td></tr>';
    
    updateStatistik();
}

// Fungsi untuk memuat data absensi yang sudah tersimpan
function loadAbsensiTersimpan() {
    const kelas = document.getElementById('selectKelas').value;
    const mapel = document.getElementById('selectMapel').value;
    const tanggal = document.getElementById('tanggalAbsensi').value;
    
    if (!kelas || !mapel || !tanggal) return;
    
    const key = `absensi_${kelas}_${mapel}_${tanggal}`;
    const dataTersimpan = localStorage.getItem(key);
    
    if (dataTersimpan) {
        const data = JSON.parse(dataTersimpan);
        absensiSementara = data.data || {};
        loadSiswa();
        
        // Tampilkan notifikasi bahwa data sudah ada
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-info alert-dismissible fade show';
        alertDiv.innerHTML = `
            Data absensi untuk ${kelas} - ${mapel} pada ${tanggal} sudah tersimpan.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(alertDiv, mainContent.firstChild);
    }
}

// Event listener untuk memuat data tersimpan saat semua field terisi
document.addEventListener('DOMContentLoaded', function() {
    const kelasSelect = document.getElementById('selectKelas');
    const mapelSelect = document.getElementById('selectMapel');
    const tanggalInput = document.getElementById('tanggalAbsensi');
    
    function checkAndLoad() {
        if (kelasSelect.value && mapelSelect.value && tanggalInput.value) {
            loadAbsensiTersimpan();
        }
    }
    
    kelasSelect.addEventListener('change', checkAndLoad);
    mapelSelect.addEventListener('change', checkAndLoad);
    tanggalInput.addEventListener('change', checkAndLoad);
});
