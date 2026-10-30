
// =============================================================
// 2.02 AJAX + JSON: Friends Cards
// Your job: load friends.json with an XMLHttpRequest and turn
// every person in it into a card.
// =============================================================
// Supplied page connections. Keep these IDs unchanged.
const loadButton = document.getElementById("loadFriends");
const cardsContainer = document.getElementById("cards");
const statusMessage = document.getElementById("status");
// CHECKPOINT 2: When the Load Friends button is clicked, run loadFriends.
loadButton.addEventListener("click", loadFriends);


// -------------------------------------------------------------
// loadFriends: request the file, check the response, parse it.
// -------------------------------------------------------------
function loadFriends() {
  // Supplied: shows the user that the page is waiting for a response.
  statusMessage.classList.remove("error");
  statusMessage.textContent = "Loading friends...";

  // CHECKPOINT 2: Write the request.
  const request = new XMLHttpRequest();

  request.open("GET", "friends.json");

  request.onload = function () {
    if (request.status === 200) {
      try {
        const friends = JSON.parse(request.responseText);
        renderFriends(friends);
      } catch (error) {
        showDataError(error);
      }
    } else {
      showLoadError();
    }
  };

  request.onerror = showLoadError;

  request.send();

}


// -------------------------------------------------------------
// renderFriends: turn the array into cards on the page.
// -------------------------------------------------------------
function renderFriends(friends) {
  // CHECKPOINT 3: Build every card in one string, then put the
  // finished string on the page. One person = one card.

  let cardsHTML = "";

  for (const friend of friends) {
    cardsHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="card h-100">
          <div class="card-body">
            <h2 class="card-title h4">${friend.name}</h2>
            <p class="relationship">${friend.relationship}</p>
            <p>${friend.detail}</p>
            <p class="hobbies"><strong>Hobbies:</strong> ${friend.hobbies.join(", ")}</p>
          </div>
        </article>
      </div>
    `;
  }

  cardsContainer.innerHTML = cardsHTML;

  // Supplied success message. Keep this after the cards are updated.
  statusMessage.classList.remove("error");
  statusMessage.textContent = `${friends.length} friends loaded.`;
}


// =============================================================
// Supplied helpers. Do not change these.
// =============================================================

// Call this when the request fails (wrong file name, server error).
function showLoadError() {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "Could not load friends. Check the JSON file name and path, then try again.";
}

// Call this from your catch block. The file arrived, but its data
// could not be used: usually a JSON typo or a misspelled key.
function showDataError(error) {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "friends.json loaded, but its data could not be used. Check quotes, commas, brackets, and key names.";
  console.error("Data problem:", error.message);
}
