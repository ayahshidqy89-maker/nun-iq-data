/**
 * Backend "Pra Ujian PAS Kelas XI" — Google Apps Script (Web App).
 *
 * CARA PASANG (via browser, script.google.com):
 *  1. Buka https://script.google.com → New project.
 *  2. Hapus isi Code.gs bawaan, tempel seluruh isi file ini.
 *  3. Deploy → New deployment → pilih type "Web app".
 *     - Execute as: Me (mrosyadi10@guru.sma.belajar.id)
 *     - Who has access: Anyone
 *  4. Salin URL Web App (.../exec) → isi ke konstanta WEBGAS_URL di
 *     pra-ujian-pas-xi/index.html (ganti __WEBGAS_URL__), lalu redeploy Vercel.
 *
 * PERUBAHAN v2 (16 Nov 2026, ~07:50): doPost MENOLAK DUPLIKAT di sisi
 * server — bila (kelas, nama, mapel) sudah ada di tab Rekap, baris baru
 * TIDAK ditambahkan; respons mengembalikan skor yang sudah tercatat.
 * Ini jaring pengaman terakhir bila cek duplikat di LKPD (sisi browser)
 * gagal jalan: skor pertama tetap yang berlaku, Sheet tetap bersih.
 * (Klien mengirim POST mode "no-cors" sehingga tidak bisa membaca
 * respons ini — yang penting baris ganda tidak tercatat.)
 *
 * PERUBAHAN v3 (17 Nov 2026): kolom ke-10 "Pindah Layar" — jumlah
 * kali siswa pindah layar/tab selama ujian (anti-curang v4).
 * doPost memastikan header J1 terisi bila masih kosong.
 *
 * Sheet tujuan: "Rekap Pra Ujian PAS XI"
 *   https://docs.google.com/spreadsheets/d/1LNFMvGZhm6zfMzzNbN271B3Onj5A_bJTcapfd69gxlE
 * Tab: "Rekap" — kolom: Timestamp | Kelas | Nama | Mapel | Versi |
 *   Benar | Jumlah Soal | Skor | Jawaban | Pindah Layar
 */

var SHEET_ID = "1LNFMvGZhm6zfMzzNbN271B3Onj5A_bJTcapfd69gxlE";
var SHEET_NAME = "Rekap";

function normalKelas(k) {
  return String(k || "").replace(/[\s\-]/g, "").toUpperCase();
}

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    var nama = String(d.nama || "").trim().toLowerCase();
    var mapel = String(d.mapel || "").trim().toUpperCase();
    var kelas = normalKelas(d.kelas);
    var data = sh.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      var r = data[i];
      if (normalKelas(r[1]) !== kelas) continue;
      if (String(r[2] || "").trim().toLowerCase() !== nama) continue;
      if (String(r[3] || "").trim().toUpperCase() !== mapel) continue;
      return ContentService
        .createTextOutput(JSON.stringify({
          ok: true, duplikat: true,
          benar: r[5], jumlahSoal: r[6], skor: r[7]
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    if (!sh.getRange(1, 10).getValue()) sh.getRange(1, 10).setValue("Pindah Layar");
    sh.appendRow([
      new Date(),
      d.kelas || "",
      d.nama || "",
      d.mapel || "",      // "PAI" atau "PAQ"
      d.versi || "",      // "Reguler" atau "PDPD"
      d.benar || 0,
      d.jumlahSoal || 0,
      d.skor || 0,
      d.jawaban || "",    // string digit, satu digit per soal ("-" bila kosong)
      d.pindah || 0       // v3: jumlah pindah layar selama ujian
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "OK" }))
    .setMimeType(ContentService.MimeType.JSON);
}
