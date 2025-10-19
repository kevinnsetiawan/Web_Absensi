// Data siswa lengkap
let dataSiswaLengkap = [];

// Inisialisasi data siswa
function initDataSiswa() {
    const dataDefault = [
        // Kelas 9A
        { id: 1, nama: 'Ahmad Rizki', nis: '2024001', kelas: '9A', tanggalLahir: '2008-05-15', noTelepon: '081234567890', alamat: 'Jl. Merdeka No. 1', namaOrtu: 'Budi Rizki', teleponOrtu: '081234567891', status: 'aktif' },
        { id: 2, nama: 'Siti Nurhaliza', nis: '2024002', kelas: '9A', tanggalLahir: '2008-03-20', noTelepon: '081234567892', alamat: 'Jl. Sudirman No. 2', namaOrtu: 'Sari Nurhaliza', teleponOrtu: '081234567893', status: 'aktif' },
        { id: 3, nama: 'Budi Santoso', nis: '2024003', kelas: '9A', tanggalLahir: '2008-07-10', noTelepon: '081234567894', alamat: 'Jl. Gatot Subroto No. 3', namaOrtu: 'Tono Santoso', teleponOrtu: '081234567895', status: 'aktif' },
        { id: 4, nama: 'Dewi Kartika', nis: '2024004', kelas: '9A', tanggalLahir: '2008-09-25', noTelepon: '081234567896', alamat: 'Jl. Diponegoro No. 4', namaOrtu: 'Rina Kartika', teleponOrtu: '081234567897', status: 'aktif' },
        { id: 5, nama: 'Eko Prasetyo', nis: '2024005', kelas: '9A', tanggalLahir: '2008-11-12', noTelepon: '081234567898', alamat: 'Jl. Thamrin No. 5', namaOrtu: 'Surya Prasetyo', teleponOrtu: '081234567899', status: 'aktif' },
        
        // Kelas 9B
        { id: 6, nama: 'Kiki Andriani', nis: '2024011', kelas: '9B', tanggalLahir: '2008-01-18', noTelepon: '081234567900', alamat: 'Jl. Kebon Jeruk No. 6', namaOrtu: 'Andi Andriani', teleponOrtu: '081234567901', status: 'aktif' },
        { id: 7, nama: 'Lina Marlina', nis: '2024012', kelas: '9B', tanggalLahir: '2008-04-22', noTelepon: '081234567902', alamat: 'Jl. Mangga Dua No. 7', namaOrtu: 'Marlin Marlina', teleponOrtu: '081234567903', status: 'aktif' },
        { id: 8, nama: 'Mario Teguh', nis: '2024013', kelas: '9B', tanggalLahir: '2008-06-30', noTelepon: '081234567904', alamat: 'Jl. Senayan No. 8', namaOrtu: 'Teguh Mario', teleponOrtu: '081234567905', status: 'aktif' },
        { id: 9, nama: 'Nina Sari', nis: '2024014', kelas: '9B', tanggalLahir: '2008-08-14', noTelepon: '081234567906', alamat: 'Jl. Pondok Indah No. 9', namaOrtu: 'Sari Nina', teleponOrtu: '081234567907', status: 'aktif' },
        { id: 10, nama: 'Oscar Wijaya', nis: '2024015', kelas: '9B', tanggalLahir: '2008-10-05', noTelepon: '081234567908', alamat: 'Jl. Kemang No. 10', namaOrtu: 'Wijaya Oscar', teleponOrtu: '081234567909', status: 'aktif' },
        
        // Kelas 9C
        { id: 11, nama: 'Umar Said', nis: '2024021', kelas: '9C', tanggalLahir: '2008-02-28', noTelepon: '081234567910', alamat: 'Jl. Cipete No. 11', namaOrtu: 'Said Umar', teleponOrtu: '081234567911', status: 'aktif' },
        { id: 12, nama: 'Vina Panduwinata', nis: '2024022', kelas: '9C', tanggalLahir: '2008-12-08', noTelepon: '081234567912', alamat: 'Jl. Pondok Labu No. 12', namaOrtu: 'Panduwinata Vina', teleponOrtu: '081234567913', status: 'aktif' },
        { id: 13, nama: 'Wawan Setiawan', nis: '2024023', kelas: '9C', tanggalLahir: '2008-05-16', noTelepon: '081234567914', alamat: 'Jl. Lebak Bulus No. 13', namaOrtu: 'Setiawan Wawan', teleponOrtu: '081234567915', status: 'aktif' },
        { id: 14, nama: 'Xena Putri', nis: '2024024', kelas: '9C', tanggalLahir: '2008-07-03', noTelepon: '081234567916', alamat: 'Jl. Fatmawati No. 14', namaOrtu: 'Putri Xena', teleponOrtu: '081234567917', status: 'aktif' },
        { id: 15, nama: 'Yoga Pratama', nis: '2024025', kelas: '9C', tanggalLahir: '2008-09-19', noTelepon: '081234567918', alamat: 'Jl. Blok M No. 15', namaOrtu: 'Pratama Yoga', teleponOrtu: '081234567919', status: 'aktif' }
    ];
    
    // Cek apakah data sudah ada di localStorage
    const dataTersimpan = localStorage.getItem('dataSiswaLengkap');
    if (dataTersimpan) {
        dataSiswaLengkap = JSON.parse(dataTersimpan);
    } else {
        dataSiswaLengkap = dataDefault;
        localStorage.setItem('dataSiswaLengkap', JSON.stringify(dataSiswaLengkap));
    }
}

// Inisialisasi halaman
document.addEventListener('DOMContentLoaded', function() {
    initDataSiswa();
    loadTabelSiswa();
    updateStatistik();
    
    // Event listener untuk pencarian
    document.getElementById('searchSiswa').addEventListener('input', filterSiswa);
    
    // Event listener untuk filter kelas
    document.getElementById('filterKelas').addEventListener('change', filterSiswa);
});

// Memuat tabel siswa
function loadTabelSiswa() {
    const tabelSiswa = document.getElementById('tabelSiswa');
    let html = '';
    
    dataSiswaLengkap.forEach((siswa, index) => {
        const statusBadge = siswa.status === 'aktif' 
            ? '<span class="badge bg-success">Aktif</span>' 
            : '<span class="badge bg-danger">Tidak Aktif</span>';
        
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${siswa.nama}</td>
                <td>${siswa.nis}</td>
                <td>${siswa.kelas}</td>
                <td>${formatTanggal(siswa.tanggalLahir)}</td>
                <td>${siswa.noTelepon || '-'}</td>
                <td>${statusBadge}</td>
                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-outline-primary" onclick="editSiswa(${siswa.id})" title="Edit">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" onclick="hapusSiswa(${siswa.id})" title="Hapus">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tabelSiswa.innerHTML = html;
}

// Filter siswa berdasarkan pencarian dan kelas
function filterSiswa() {
    const searchTerm = document.getElementById('searchSiswa').value.toLowerCase();
    const filterKelas = document.getElementById('filterKelas').value;
    
    const siswaFiltered = dataSiswaLengkap.filter(siswa => {
        const matchSearch = siswa.nama.toLowerCase().includes(searchTerm) || 
                           siswa.nis.toLowerCase().includes(searchTerm);
        const matchKelas = !filterKelas || siswa.kelas === filterKelas;
        
        return matchSearch && matchKelas;
    });
    
    const tabelSiswa = document.getElementById('tabelSiswa');
    let html = '';
    
    siswaFiltered.forEach((siswa, index) => {
        const statusBadge = siswa.status === 'aktif' 
            ? '<span class="badge bg-success">Aktif</span>' 
            : '<span class="badge bg-danger">Tidak Aktif</span>';
        
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${siswa.nama}</td>
                <td>${siswa.nis}</td>
                <td>${siswa.kelas}</td>
                <td>${formatTanggal(siswa.tanggalLahir)}</td>
                <td>${siswa.noTelepon || '-'}</td>
                <td>${statusBadge}</td>
                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-outline-primary" onclick="editSiswa(${siswa.id})" title="Edit">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger" onclick="hapusSiswa(${siswa.id})" title="Hapus">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tabelSiswa.innerHTML = html;
}

// Update statistik
function updateStatistik() {
    const totalSiswa = dataSiswaLengkap.length;
    const siswaAktif = dataSiswaLengkap.filter(siswa => siswa.status === 'aktif').length;
    const siswaTidakAktif = totalSiswa - siswaAktif;
    
    // Hitung rata-rata kehadiran (simulasi)
    const rataRataKehadiran = Math.floor(Math.random() * 20) + 80; // 80-100%
    
    document.getElementById('totalSiswa').textContent = totalSiswa;
    document.getElementById('siswaAktif').textContent = siswaAktif;
    document.getElementById('siswaTidakAktif').textContent = siswaTidakAktif;
    document.getElementById('rataRataKehadiran').textContent = rataRataKehadiran + '%';
}

// Format tanggal
function formatTanggal(tanggal) {
    const date = new Date(tanggal);
    return date.toLocaleDateString('id-ID');
}

// Simpan siswa baru
function simpanSiswa() {
    const nama = document.getElementById('namaSiswa').value;
    const nis = document.getElementById('nisSiswa').value;
    const kelas = document.getElementById('kelasSiswa').value;
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const noTelepon = document.getElementById('noTelepon').value;
    const alamat = document.getElementById('alamatSiswa').value;
    const namaOrtu = document.getElementById('namaOrtu').value;
    const teleponOrtu = document.getElementById('teleponOrtu').value;
    
    if (!nama || !nis || !kelas || !tanggalLahir) {
        alert('Mohon lengkapi field yang wajib diisi');
        return;
    }
    
    // Cek apakah NIS sudah ada
    const nisExists = dataSiswaLengkap.some(siswa => siswa.nis === nis);
    if (nisExists) {
        alert('NIS sudah terdaftar');
        return;
    }
    
    // Generate ID baru
    const newId = Math.max(...dataSiswaLengkap.map(siswa => siswa.id)) + 1;
    
    const siswaBaru = {
        id: newId,
        nama: nama,
        nis: nis,
        kelas: kelas,
        tanggalLahir: tanggalLahir,
        noTelepon: noTelepon,
        alamat: alamat,
        namaOrtu: namaOrtu,
        teleponOrtu: teleponOrtu,
        status: 'aktif'
    };
    
    dataSiswaLengkap.push(siswaBaru);
    localStorage.setItem('dataSiswaLengkap', JSON.stringify(dataSiswaLengkap));
    
    // Tutup modal dan reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalTambahSiswa'));
    modal.hide();
    document.getElementById('formTambahSiswa').reset();
    
    // Reload tabel dan statistik
    loadTabelSiswa();
    updateStatistik();
    
    alert('Data siswa berhasil ditambahkan');
}

// Edit siswa
function editSiswa(id) {
    const siswa = dataSiswaLengkap.find(s => s.id === id);
    if (!siswa) return;
    
    // Isi form edit
    document.getElementById('editIdSiswa').value = siswa.id;
    document.getElementById('editNamaSiswa').value = siswa.nama;
    document.getElementById('editNisSiswa').value = siswa.nis;
    document.getElementById('editKelasSiswa').value = siswa.kelas;
    document.getElementById('editTanggalLahir').value = siswa.tanggalLahir;
    document.getElementById('editNoTelepon').value = siswa.noTelepon || '';
    document.getElementById('editAlamatSiswa').value = siswa.alamat || '';
    document.getElementById('editNamaOrtu').value = siswa.namaOrtu || '';
    document.getElementById('editTeleponOrtu').value = siswa.teleponOrtu || '';
    document.getElementById('editStatusSiswa').value = siswa.status;
    
    // Tampilkan modal
    const modal = new bootstrap.Modal(document.getElementById('modalEditSiswa'));
    modal.show();
}

// Update siswa
function updateSiswa() {
    const id = parseInt(document.getElementById('editIdSiswa').value);
    const nama = document.getElementById('editNamaSiswa').value;
    const nis = document.getElementById('editNisSiswa').value;
    const kelas = document.getElementById('editKelasSiswa').value;
    const tanggalLahir = document.getElementById('editTanggalLahir').value;
    const noTelepon = document.getElementById('editNoTelepon').value;
    const alamat = document.getElementById('editAlamatSiswa').value;
    const namaOrtu = document.getElementById('editNamaOrtu').value;
    const teleponOrtu = document.getElementById('editTeleponOrtu').value;
    const status = document.getElementById('editStatusSiswa').value;
    
    if (!nama || !nis || !kelas || !tanggalLahir) {
        alert('Mohon lengkapi field yang wajib diisi');
        return;
    }
    
    // Cek apakah NIS sudah ada (kecuali untuk siswa yang sedang diedit)
    const nisExists = dataSiswaLengkap.some(siswa => siswa.nis === nis && siswa.id !== id);
    if (nisExists) {
        alert('NIS sudah terdaftar');
        return;
    }
    
    // Update data siswa
    const index = dataSiswaLengkap.findIndex(siswa => siswa.id === id);
    if (index !== -1) {
        dataSiswaLengkap[index] = {
            id: id,
            nama: nama,
            nis: nis,
            kelas: kelas,
            tanggalLahir: tanggalLahir,
            noTelepon: noTelepon,
            alamat: alamat,
            namaOrtu: namaOrtu,
            teleponOrtu: teleponOrtu,
            status: status
        };
        
        localStorage.setItem('dataSiswaLengkap', JSON.stringify(dataSiswaLengkap));
        
        // Tutup modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditSiswa'));
        modal.hide();
        
        // Reload tabel dan statistik
        loadTabelSiswa();
        updateStatistik();
        
        alert('Data siswa berhasil diupdate');
    }
}

// Hapus siswa
function hapusSiswa(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
        const index = dataSiswaLengkap.findIndex(siswa => siswa.id === id);
        if (index !== -1) {
            dataSiswaLengkap.splice(index, 1);
            localStorage.setItem('dataSiswaLengkap', JSON.stringify(dataSiswaLengkap));
            
            // Reload tabel dan statistik
            loadTabelSiswa();
            updateStatistik();
            
            alert('Data siswa berhasil dihapus');
        }
    }
}

// Export data
function exportData(format) {
    if (format === 'excel') {
        // Simulasi export Excel
        alert('Fitur export Excel akan segera tersedia');
    } else if (format === 'pdf') {
        // Simulasi export PDF
        alert('Fitur export PDF akan segera tersedia');
    }
}

// Fungsi untuk mendapatkan data siswa berdasarkan kelas (untuk digunakan di halaman lain)
function getDataSiswaByKelas(kelas) {
    return dataSiswaLengkap.filter(siswa => siswa.kelas === kelas && siswa.status === 'aktif');
}
