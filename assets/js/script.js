document.addEventListener("DOMContentLoaded", music);

function music() {
    let soundEnabled = false;  // global sound state
    let muteBtn = document.getElementById("mute-btn");
    muteBtn.addEventListener("click", function () { 
        soundEnabled = !soundEnabled;
   
    // If turning sound OFF → pause melody if playing
    if (soundEnabled===true) {
      document.getElementById("intro-melody").play();
        muteBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>` ;
    } else {
        document.getElementById("intro-melody").pause(); 
         muteBtn.innerHTML =  `<i class="fa-solid fa-volume-xmark"></i> ` ;
    }
  });
}


// DOM Elements
const startScreen = document.getElementById("start-screen");
const beginScreen = document.getElementById("name-screen");

document.getElementById("start-btn").addEventListener("click", namePage);

function namePage() {
  startScreen.classList.remove("active");
  beginScreen.classList.add("active");
}
document.getElementById("begin-btn").addEventListener("click", function () {
  const title = document.querySelector(".person-title").value;
  const name = document.querySelector(".name-input").value.trim();

  // Clear previous messages
  document.getElementById("title-error").textContent = "";
  document.getElementById("name-error").textContent = "";

  if (!title) {
    document.getElementById("title-error").innerHTML =
      `<i class="fa-solid fa-triangle-exclamation"></i> Please select a title.`;
    return false;
  }

  if (!name) {
    document.getElementById("name-error").innerHTML =
      `<i class="fa-solid fa-triangle-exclamation"></i>Please enter your name.`;
    return false;
  }

  // If both are filled,
  localStorage.setItem("playerName", name);
  localStorage.setItem("playerTitle", title);
  window.location.href = "quiz.html";
  return true;
});