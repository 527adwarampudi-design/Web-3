/* ==================================================
   WELCOME POPUP
================================================== */


// Get the popup elements

const popup = document.getElementById("welcomePopup");

const nameInput = document.getElementById("nameInput");

const exploreButton = document.getElementById("exploreButton");

const closeButton = document.getElementById("closePopup");

const errorMessage = document.getElementById("errorMessage");



// ==================================================
// PUT NAME ON PAGE
// ==================================================

function updateName(name) {

    const nameElements =
        document.querySelectorAll(".user-name");


    nameElements.forEach(function(element) {

        element.textContent = name;

    });

}



// ==================================================
// EXPLORE BUTTON
// ==================================================

exploreButton.addEventListener("click", function() {


    // Get the name from the input

    const name = nameInput.value.trim();


    // Check if they actually entered a name

    if (name === "") {

        errorMessage.style.display = "block";

        nameInput.focus();

        return;

    }


    // Hide error message

    errorMessage.style.display = "none";


    // Save their name

    localStorage.setItem("studentName", name);


    // Update the website

    updateName(name);


    // Close popup

    popup.style.display = "none";

});



// ==================================================
// CLOSE POPUP
// ==================================================

closeButton.addEventListener("click", function() {

    popup.style.display = "none";

});



// ==================================================
// CHECK FOR SAVED NAME
// ==================================================

const savedName =
    localStorage.getItem("studentName");


if (savedName) {

    // Don't show popup again

    popup.style.display = "none";


    // Put saved name everywhere

    updateName(savedName);

}



// ==================================================
// ENTER KEY ALSO SUBMITS NAME
// ==================================================

nameInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        exploreButton.click();

    }

});



// ==================================================
// QUIZ START
// ==================================================


// These are here so the quiz section is ready
// for the actual quiz logic we will add next.

const startQuiz =
    document.getElementById("startQuiz");

const quizQuestions =
    document.getElementById("quizQuestions");


const questions =
    document.querySelectorAll(".quiz-question");



startQuiz.addEventListener("click", function() {


    // Hide the intro button

    startQuiz.style.display = "none";


    // Show the quiz

    quizQuestions.style.display = "block";


    // Show the first question

    if (questions.length > 0) {

        questions[0].style.display = "block";

    }

});