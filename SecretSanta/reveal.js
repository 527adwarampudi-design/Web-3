// =============================================================
// 2.05 BONUS: reveal page
// Same /exec web address as script.js.
// =============================================================

const API = "PASTE YOUR /exec WEB ADDRESS HERE";

// 1. Form submit: stop the reload, read the name.

// 2. fetch() GET with the name in the web address:  API + "?name=Ana"

// 3. The sheet answers one of these:
//    { "result": "found", "giver": "Ana", "receiver": "Ben", "budget": "...", "date": "...", "time": "...", "location": "..." }
//    { "result": "not found" }

// 4. Show who they're buying for, plus the budget, date, time, and location.
//    Not found or error: show a friendly message.
