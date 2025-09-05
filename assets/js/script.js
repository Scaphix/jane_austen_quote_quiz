document.addEventListener("DOMContentLoaded", music);

let soundEnabled = false;  // global sound state

const changeMusicState = () => {
  soundEnabled = !soundEnabled;
  let icons = document.querySelectorAll(".sound-icon");
  if (soundEnabled) {
      document.getElementById("intro-melody").play();
      icons.forEach((icon) => {
        icon.classList.remove("fa-volume-xmark");
        icon.classList.add("fa-volume-high");
      });
    } else {
      document.getElementById("intro-melody").pause(); 
      icons.forEach((icon) => {
        icon.classList.remove("fa-volume-high");
        icon.classList.add("fa-volume-xmark");
      });
    }
};

function music() {
    let muteBtn = document.getElementById("mute-btn");
    let muteBtn2= document.getElementById("mute-btn2");

    muteBtn.addEventListener('click', changeMusicState);
    muteBtn2.addEventListener('click', changeMusicState);

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