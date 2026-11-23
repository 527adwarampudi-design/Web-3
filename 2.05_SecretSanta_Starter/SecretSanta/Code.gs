// =============================================================
// 2.05 Secret Santa: the sheet's two doors
//   doPost: your organizer page SENDS the matches here.
//   doGet:  your reveal page ASKS who one person is buying for.
// =============================================================

function doPost(e) {
  // The text your page sent, turned back into an object.
  var data = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Keep only the newest exchange: clear old rows, keep row 1.
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).clearContent();
  }

  // One new row per match.
  for (var i = 0; i < data.pairs.length; i++) {
    sheet.appendRow([
      data.pairs[i].giver,
      data.pairs[i].receiver,
      data.rules.budget,
      data.rules.date,
      data.rules.time,
      data.rules.location,
      new Date()
    ]);
  }

  return sendJSON({ result: "success" });
}

function doGet(e) {
  // The name from the web address: .../exec?name=Ana
  var name = (e.parameter.name || "").trim().toLowerCase();
  var rows = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    .getDataRange().getDisplayValues();

  // Row 0 is the header, so start at 1.
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0].toLowerCase() === name) {
      return sendJSON({
        result: "found",
        giver: rows[i][0],
        receiver: rows[i][1],
        budget: rows[i][2],
        date: rows[i][3],
        time: rows[i][4],
        location: rows[i][5]
      });
    }
  }

  return sendJSON({ result: "not found" });
}

// Turns an object into a JSON answer for the page.
function sendJSON(object) {
  return ContentService.createTextOutput(JSON.stringify(object))
    .setMimeType(ContentService.MimeType.JSON);
}
