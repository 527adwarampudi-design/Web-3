
/* =============================================================
   2.03 Fetch + async/await: Friends Cards
   This version loads friends.json using async/await.
   ============================================================= */

// Supplied page connections. Keep these IDs unchanged.
const loadButton = document.getElementById("loadFriends");
const cardsContainer = document.getElementById("cards");
const statusMessage = document.getElementById("status");

loadButton.addEventListener("click", loadFriends);

// -------------------------------------------------------------
// loadFriends: ASYNC/AWAIT VERSION (Checkpoint 3)
// -------------------------------------------------------------
async function loadFriends() {
  statusMessage.classList.remove("error");
  statusMessage.textContent = "Loading friends...";

  try {
    // Request the friends.json file.
    const response = await fetch("friends.json");

    // Check if the response was successful.
    // A 404 does not automatically cause fetch() to reject.
    if (!response.ok) {
      throw new Error(response.status);
    }

    // Convert the response into JSON data.
    const friends = await response.json();

    // Display the friends as cards.
    renderFriends(friends);

  } catch (error) {

    // If the JSON data is broken, show the data error.
    if (error instanceof SyntaxError) {
      showDataError(error);

    } else {
      // Handle loading errors such as 404 or offline.
      showLoadError();
    }
  }
}

// -------------------------------------------------------------
// renderFriends: turns the array into cards.
// Do not change this function for this lesson.
// -------------------------------------------------------------
function renderFriends(friends) {
  let cardsHTML = "";

  friends.forEach(function (friend) {
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
      </div>`;
  });

  cardsContainer.innerHTML = cardsHTML;
  statusMessage.classList.remove("error");
  statusMessage.textContent = `${friends.length} friends loaded.`;
}

// =============================================================
// Supplied helpers. Do not change these.
// =============================================================

// Call when the file cannot be loaded:
// wrong name, 404, or no connection.
function showLoadError() {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "Could not load friends. Check the JSON file name and path, then try again.";
}

// Call when the file loaded but its JSON is broken.
function showDataError(error) {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "friends.json loaded, but its data could not be used. Check quotes, commas, brackets, and key names.";
  console.error("Data problem:", error.message);
}
