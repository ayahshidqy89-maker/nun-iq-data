# Pra Ujian PAS Kelas XI

LKPD pra ujian (satu aplikasi, dua mapel) + dashboard pemantauan.
SMAN 4 Banjarmasin — guru: M. Imron Rosyadi, S.Pd.I.

## Yang ada di folder ini

- `index.html` — LKPD. Alur: pilih mapel (PAI / PAQ) → pilih kelas
  (XI-1 s.d. XI-8) → pilih nama (hanya nama kelas itu, urut abjad) →
  kerjakan soal → kumpul → skor langsung tampil.
  - Reguler: 40 soal, opsi A–E, skor = benar × 2,5.
  - PDPD (7 siswa ditandai di data): 15 soal bergambar, opsi A–B,
    skor = benar/15 × 100. Tanpa label khusus di layar siswa.
  - Cegah submit ganda: cek dulu via gviz apakah nama+mapel itu sudah
    ada di Sheet; bila sudah, tampilkan skor tercatatnya.
  - Data soal + siswa ter-embed di file (40 PAI + 40 PAQ + 15 PDPD PAI
    + 15 PDPD PAQ; 281 siswa). Opsi TIDAK diacak — kunci tetap cocok.
  - Arab: span `dir="rtl"` + Noto Naskh Arabic; paragraf/opsi tetap LTR
    (tanpa karakter RLM).
  - KUNCI WAKTU (16 Nov, perintah Imron): XI-3 s.d. XI-7 hanya bisa
    membuka pra ujian pada jam pelajaran 2 JP (ke atas) Imron — per
    (kelas, mapel), mengikuti jadwal Revisi III; jam 1 JP tidak dipakai
    (persiapan/evaluasi). XI-1, XI-2, XI-8 tidak dibatasi. Di luar
    jendela muncul layar terkunci ("Belum Waktunya" / "Waktu Sudah
    Habis" / "Bukan Jadwal Hari Ini") + jadwalnya. Pengecekan memakai
    jam perangkat siswa — penertib anti-bocor antar kelas, BUKAN
    pengaman anti-curang mutlak. Sekali masuk di dalam jendela, siswa
    boleh menyelesaikan + mengumpulkan walau jam habis di tengah jalan.
    Jendela: XI-3 PAI Jumat 08:00–09:00, PAQ Kamis 12:45–14:15; XI-4
    PAI Selasa 08:15–10:45 (3 JP), PAQ Rabu 14:30–16:00; XI-5 PAI
    Kamis 10:45–12:15, PAQ Rabu 10:45–12:15; XI-6 PAI Rabu 12:45–14:15,
    PAQ Kamis 09:00–10:45; XI-7 PAI Senin 08:15–09:45, PAQ Rabu
    09:00–10:45. Jurnal mengajar TIDAK terpengaruh fitur ini.
  - SIMPAN PROGRES (16 Nov, perbaikan bug): jawaban + posisi soal
    tersimpan otomatis di localStorage perangkat siswa (kunci per
    mapel+kelas+nama). Kalau browser ketutup di tengah jalan, masuk
    lagi dengan identitas yang sama → lanjut dari soal terakhir.
    Dihapus begitu jawaban berhasil dikumpulkan; kalau pengiriman
    gagal karena jaringan, progres dipertahankan supaya bisa coba lagi.
    Siswa yang sudah masuk di dalam jendela lalu melanjutkan sesudah
    jendela habis TETAP boleh (kunci waktu tidak dicek ulang untuk
    progres tersimpan).
- `dashboard/index.html` — Dashboard pemantauan (desain TERANG: latar
  hijau muda, aksen hijau tua #14532D — beda total dari dashboard
  supervisi yang gelap). Polling gviz tiap 8 detik, ringkasan per mapel,
  progres per kelas, notifikasi ucapan selamat tiap siswa selesai
  (tier nilai), tabel hasil + filter kelas/mapel/cari nama.
- `Code.gs` — Backend Apps Script (doPost append baris ke Sheet,
  doGet status OK). Arsip; yang live dipasang via script.google.com.
- `img-pdpd-pai/` + `img-pdpd-paq/` — gambar soal PDPD (WebP, q01–q15).

## Backend (SUDAH LIVE — 16 Nov 2026 06:15 WITA)

- Sheet **"Rekap Pra Ujian PAS XI"**
  - ID: `1LNFMvGZhm6zfMzzNbN271B3Onj5A_bJTcapfd69gxlE`
  - Tab `Rekap`, kolom: Timestamp | Kelas | Nama | Mapel | Versi |
    Benar | Jumlah Soal | Skor | Jawaban
  - Sharing: anyone with link (reader) — gviz publik SUDAH terverifikasi.
  - `SHEET_ID` sudah terisi di kedua HTML.
- Apps Script Web App **"Pra Ujian PAS XI"** — SELESAI + TERVERIFIKASI
  - Proyek ID: `1b9GFRWjSPSiFnt27jP2Z2ac1RQojU1TXCWdgwYVpdIc7b-z_M1W7MeLJ`
  - URL exec: `https://script.google.com/macros/s/AKfycbwvNzyrn711R2WkprLQC1jgWf1AYQtOGAMtQ1koH_kNgFVV41Y98B63MXTpXto5Y6hU/exec`
  - Deploy: Web app, Execute as Me (mrosyadi10), Who has access: Anyone.
  - Verifikasi: GET URL mengembalikan `{"status":"OK"}` (HTTP 200).
  - `WEBGAS_URL` sudah terisi di `index.html`. Catatan: pembuatan via
    browser — kata sandi tersimpan sempat ditolak Google ("Wrong
    password"), Imron lalu memasukkan sendiri sandi yang benar di
    browser dan masuk berhasil. `hatch_gws_cli script` TETAP tidak
    didukung wrapper, jadi perubahan skrip selanjutnya tetap lewat
    browser (script.google.com) pada deployment yang sama.

## YANG MASIH TERTUNDA (16 Nov 2026)

### 1. Push ke GitHub — SEBAGIAN (teks via snapshot, gambar via browser)
Commit lokal berisi SEMUA file (termasuk 30 WebP).
`git push` gagal: tidak ada kredensial GitHub di VM ini (`gh` belum login,
tanpa credential helper). Konektor GitHub (`push-files`) hanya menerima
file UTF-8 — WebP biner DITOLAK. Rencana: 4 berkas teks (index.html,
dashboard/index.html, Code.gs, README.md) didorong via snapshot
`push-files` (satu commit), 30 WebP diunggah lewat antarmuka web GitHub
di browser (buat folder img-pdpd-pai/ + img-pdpd-paq/, unggah, hapus
.gitkeep sementara bila dipakai).

### 3. Deploy Vercel — BELUM (butuh re-autorisasi tim)
Semua operasi MCP Vercel saat ini 403:
"Not authorized: Trying to access resource under scope \"tksa\".
You must re-authenticate to this scope" (team `team_KpiyPuBGSz6Fo2GbkmQv5yjv`).
Tool `authorize_team_access` TIDAK ada di daftar tool MCP yang tersedia,
jadi re-autorisasi harus lewat parent/pengguna.
Sesudah akses tim pulih: buat proyek `pra-ujian-pas-xi` (repo
`ayahshidqy89-maker/nun-iq-data`, rootDirectory `pra-ujian-pas-xi`,
tanpa teamId eksplisit bila memungkinkan) → URL harapan
https://pra-ujian-pas-xi.vercel.app dan
https://pra-ujian-pas-xi.vercel.app/dashboard/

## Catatan data

- Duplikat nama di sumber: "Rizki Alya Rosyifa" muncul 2× di XI-2
  (satu L, satu P) — berasal dari data siswa yang disiapkan; dropdown
  akan menampilkan nama itu dua kali. Perlu konfirmasi Imron mana yang
  benar (atau memang dua siswa berbeda yang namanya sama).
- Nama pindah sudah dihapus dari data: Ahmad (XI-8), Alif Setiawan
  (XI-3), Aski Ilman (XI-7).
