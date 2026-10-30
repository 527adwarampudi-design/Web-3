const loadButton = document.getElementById("loadFriends");
const cardsContainer = document.getElementById("cards");
const statusMessage = document.getElementById("status");

loadButton.addEventListener("click", loadFriends);

function loadFriends() {
  statusMessage.classList.remove("error");
  statusMessage.textContent = "Loading friends...";

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

function renderFriends(friends) {
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

  statusMessage.classList.remove("error");
  statusMessage.textContent = `${friends.length} friends loaded.`;
}

function showLoadError() {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "Could not load friends. Check the JSON file name and path, then try again.";
}

function showDataError(error) {
  cardsContainer.innerHTML = "";
  statusMessage.classList.add("error");
  statusMessage.textContent =
    "friends.json loaded, but its data could not be used. Check quotes, commas, brackets, and key names.";
  console.error("Data problem:", error.message);
}