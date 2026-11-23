// =============================================================
// 2.05 Secret Santa Generator: organizer page
// Paste your /exec web address below. Write the rest yourselves.
// =============================================================

const API = "PASTE YOUR /exec WEB ADDRESS HERE";

let names = [];

// 1. Collect the names
//    No blanks. No duplicates.

// 2. Generate (form submit)
//    Stop the page from reloading.
//    Need at least 3 names and all 4 rules.
//    Give each person a match: nobody gets themselves,
//    everyone gives once and receives once.
//    (The shuffle code in the assignment can help.)

// 3. Send to the sheet with fetch() POST
//    { "pairs": [ { "giver": "Ana", "receiver": "Ben" } ],
//      "rules": { "budget": "...", "date": "...", "time": "...", "location": "..." } }

// 4. Check the reply: { "result": "success" }
//    Success: show every match + date, time, location, neat and styled,
//    in the popup (#matches) OR on a separate results page.
//    Error: show a message.

// 5. Print button: print the matches.
