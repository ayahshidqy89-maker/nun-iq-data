# Pra Ujian PAS Kelas XII

LKPD pra ujian PAI + dashboard pemantauan.
SMAN 4 Banjarmasin — guru PAI: Noor Azmi, S.Pd., M.Pd. (XII 1–5) dan
Muhammad Fakhruzzaini, M.Pd. (XII 6–9). Soal v2 BARU dari patokan naskah
PAS XII REVISI (supaya soal PAS asli tidak bocor).

## Yang ada di folder ini

- `index.html` — LKPD v1.0. Alur: pilih kelas (XII-1 s.d. XII-9) →
  pilih nama (hanya nama kelas itu, urut abjad) → kerjakan soal →
  kumpul → skor langsung tampil. Satu kartu mapel saja: PAI & Budi Pekerti.
  - Reguler: 40 soal v2 baru, opsi A–E, skor = benar × 2,5.
  - PDPD (5 siswa ditandai di data): 15 soal v2 baru bergambar, opsi A–B,
    skor = benar/15 × 100. Tanpa label khusus di layar siswa.
  - PDPD XII: Muhammad Firdaus Adha (XII-3), Noor Ahda (XII-6),
    Dimas Ramadhan (XII-7), Ahmad Fauzi (XII-9), Mutiara (XII-9).
    Yafi Rachman (XII-8) = REGULER — ada surat penolakan orang tua
    yang tidak menerima ia dianggap PDPD.
  - Anti-curang v4: deteksi pindah layar (tercatat + lencana di dashboard)
    + acak soal & opsi unik per siswa (seeded nama+kelas+mapel; build
    gagal bila ada dua sidik sama — 293 sidik berbeda terverifikasi).
  - Timer 90 menit + dijeda di semua istirahat (Senin–Kamis 09:45–10:00,
    ishoma 12:00–13:00, 14:15–14:30; Jumat 09:30–09:45).
  - Suara/musik WebAudio + mp3 mixkit, dropdown custom bertema,
    simpan progres localStorage, masa tenggang 60 menit sesudah jendela,
    lanjutan kiriman (tombol Lanjutkan di jendela khusus; kiriman baru
    menimpa baris lama di Sheet).
  - Cegah submit ganda: cek dulu via gviz apakah nama+mapel itu sudah
    ada di Sheet; bila sudah, tampilkan skor tercatatnya.
  - Data soal + siswa ter-embed di file (40 PAI + 15 PDPD PAI; 293 siswa).
  - Arab: span `dir="rtl"` + Noto Naskh Arabic; paragraf/opsi tetap LTR
    (tanpa karakter RLM).
  - KUNCI WAKTU: tiap kelas hanya bisa membuka pra ujian pada jam PAI
    2 JP-nya (Revisi III); jam 1 JP tidak dipakai. Di luar jendela muncul
    layar terkunci + jadwalnya. Jendela: XII 1 Kamis 09:00–10:45,
    XII 2 Kamis 10:45–12:15, XII 3 Senin 10:00–11:30,
    XII 4 Rabu 14:30–16:00, XII 5 Kamis 12:45–14:15,
    XII 6 Senin 14:30–16:00, XII 7 Rabu 14:30–16:00,
    XII 8 Kamis 14:30–16:00, XII 9 Selasa 07:30–09:00.
    Tidak ada jendela PAI XII pada hari Jumat.
- `dashboard/index.html` — Dashboard pemantauan (desain TERANG, sama
  seperti dashboard XI). Polling gviz tiap 8 detik, ringkasan PAI,
  progres per kelas, notifikasi tiap siswa selesai, tabel hasil,
  detail per kelas, unduh PDF hasil per kelas.
- `Code.gs` — Backend Apps Script v4 (doPost: tolak duplikat, kolom
  "Pindah Layar", lanjutan kiriman menimpa baris lama; doGet status OK).
  Arsip; yang live dipasang via script.google.com.
- `img-pdpd-pai/` — gambar soal PDPD (WebP 900×600, q01–q15).

## Backend (LIVE — 17 Nov 2026 13:04 WITA)

- Sheet **"Rekap Pra Ujian PAS XII"**
  - ID: `10zwKEuR7g6jnS5dsd-imr1F5obQS7rIvUScYdEI_a7g`
  - Tab `Rekap`, kolom: Timestamp | Kelas | Nama | Mapel | Versi |
    Benar | Jumlah Soal | Skor | Jawaban | Pindah Layar
  - `SHEET_ID` sudah terisi di kedua HTML.
- Apps Script Web App **"Pra Ujian PAS XII"**
  - Proyek ID: `1T5UT7gveuTKKPZ0lkZkigHh4JfP_Lf2Yx1zJbi-vUk7wAPayWU16mXyN`
  - URL exec: `https://script.google.com/macros/s/AKfycbygdCEBc-DD5r50z8u0QaeO5HxZqvOMnB4iBf1Dxj4zvWHwtnZMbqI3st0KnSsb6ds-/exec`
  - Deploy: Web app, Execute as Me (mrosyadi10), Who has access: Anyone.
  - Verifikasi live 17 Nov 13:05: kiriman baru tercatat; lanjutan
    menimpa baris di tempat; duplikat tanpa lanjutan ditolak; baris
    tes sudah dihapus (Sheet bersih, header saja).
  - `WEBGAS_URL` sudah terisi di `index.html`.

## Deploy

- GitHub: folder `pra-ujian-pas-xii/` di repo `ayahshidqy89-maker/nun-iq-data`
  (teks via snapshot push-files; 15 WebP diunggah lewat antarmuka web
  GitHub di browser — konektor GitHub hanya menerima file UTF-8).
- Vercel: proyek `pra-ujian-pas-xii` — BELUM DIBUAT. URL harapan
  https://pra-ujian-pas-xii.vercel.app dan
  https://pra-ujian-pas-xii.vercel.app/dashboard/
  (Vercel MCP 403 scope "tksa" — buat lewat dashboard browser seperti
  proyek XI, lalu auto-deploy dari push GitHub.)
