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
 * Sheet tujuan: "Rekap Pra Ujian PAS XI"
 *   https://docs.google.com/spreadsheets/d/1LNFMvGZhm6zfMzzNbN271B3Onj5A_bJTcapfd69gxlE
 * Tab: "Rekap" — kolom: Timestamp | Kelas | Nama | Mapel | Versi |
 *   Benar | Jumlah Soal | Skor | Jawaban
 */

var SHEET_ID = "1LNFMvGZhm6zfMzzNbN271B3Onj5A_bJTcapfd69gxlE";
var SHEET_NAME = "Rekap";

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    sh.appendRow([
      new Date(),
      d.kelas || "",
      d.nama || "",
      d.mapel || "",      // "PAI" atau "PAQ"
      d.versi || "",      // "Reguler" atau "PDPD"
      d.benar || 0,
      d.jumlahSoal || 0,
      d.skor || 0,
      d.jawaban || ""     // string digit, satu digit per soal ("-" bila kosong)
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
