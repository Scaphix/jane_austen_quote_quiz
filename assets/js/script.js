// DOM Elements
const startScreen = document.getElementById("start-screen");
const beginScreen = document.getElementById("name-screen");

document.getElementById("start-btn").addEventListener("click", namePage);

function namePage() {
  startScreen.classList.remove("active");
  beginScreen.classList.add("active");
}
document.getElementById("begin-btn").addEventListener("click", function () {
 window.location.href = "quiz.html";
});