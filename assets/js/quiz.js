// DOM Elements

const quizScreen = document.getElementById("quiz-screen");
const questionText = document.getElementById("question-text");
const quoteElement = document.querySelector(".quote");
const quizCard = document.querySelector(".quiz-card");

const resultScreen = document.getElementById("result-screen");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const maxScoreSpan = document.getElementById("max-score");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.querySelector(".final-score");
const restartButton = document.getElementById("restart-btn");
const quizBtn = document.getElementById("quiz-btn");
const scoreButton = document.getElementById("score-btn");
const scoreScreen = document.getElementById("score-screen");

//options Buttons
const button1 = document.getElementById("option1");
const button2 = document.getElementById("option2");
const button3 = document.getElementById("option3");
const button4 = document.getElementById("option4");

const optionButtons = [button1, button2, button3, button4];

// enable sound effects

let soundEnabled = false;
let btn = document.getElementById("mute-btn");
let icon = document.getElementById("sound-icon");

btn.addEventListener("click", toggleSound);

function toggleSound() {
  soundEnabled = !soundEnabled; // toggle

  if (soundEnabled) {
    icon.classList.remove("fa-volume-xmark");
    icon.classList.add("fa-volume-high");
  } else {
    icon.classList.remove("fa-volume-high");
    icon.classList.add("fa-volume-xmark");
  }
}

let num = 8;
let currentQuestion = 0;
let score = 0;
// How many questions has the quiz
  totalQuestionsSpan.textContent = num;
  maxScoreSpan.textContent = num;

// event listeners

restartButton.addEventListener("click", restartQuiz);
quizBtn.addEventListener("click", restartQuiz);
scoreButton.addEventListener("click", showScore);

startQuiz();

function startQuiz() {
  // reset variables
  currentQuestion = 0;
  score = 0;
  scoreSpan.textContent = 0;
 // Create a new array of 8 random questions

  quizData.sort(() => Math.random() - 0.5).slice(0,num);

  showQuestion();
}

function showQuestion() {
  // reset state
  const question = quizData[currentQuestion];
  currentQuestionSpan.textContent = currentQuestion + 1;
  // Show the quote
  quoteElement.textContent = `${question.quote}`;
  //randomize the options:
  question.options = question.options.sort(() => Math.random() - 0.5);
  // Create buttons
  button1.textContent = `${question.options[0]}`;
  button2.textContent = `${question.options[1]}`;
  button3.textContent = `${question.options[2]}`;
  button4.textContent = `${question.options[3]}`;

  // Reset buttons for this new question
  optionButtons.forEach((button) => {
    button.classList.remove("correct", "wrong");
    button.disabled = false;
    // Add new click behavior
    button.onclick = () => checkAnswer(button, question.answer);
  });
}

// Check the clicked answer
function checkAnswer(clickedButton, correctAnswer) {
  // Disable all buttons once an answer is clicked
  optionButtons.forEach((button) => (button.disabled = true)); // lock after answering

  // Highlight the correct answer

  optionButtons.forEach((button) => {
    if (button.textContent === correctAnswer) {
      button.classList.add("correct"); // green
    }
  });
  // If the clicked button was wrong
  if (clickedButton.textContent !== correctAnswer) {
    clickedButton.classList.add("wrong");
    playWrongSound();
  } else {
    score++; // only add score if correct
    playCorrectSound();
    scoreSpan.textContent = score;
  }
  function playCorrectSound() {
    if (soundEnabled === true) {
      const correctSound = document.getElementById("correct-sound");
      correctSound.pause(); // stop if already playing
      correctSound.currentTime = 0; // rewind to start
      correctSound.play();
    }
  }
  function playWrongSound() {
    if (soundEnabled === true) {
      const wrongSound = document.getElementById("wrong-sound");
      wrongSound.pause();
      wrongSound.currentTime = 0;
      wrongSound.play();
    }
  }

  // Next question after 2 seconds
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < num) {
      showQuestion();
    } else {
      showResults();
    }
  }, 2000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  // Get player info
  let playerName = localStorage.getItem("playerName");
  let playerTitle = localStorage.getItem("playerTitle");

  document.querySelector(".title-display").textContent =
    playerTitle + " " + playerName;

  // Save this round into localStorage (array of scores)
  let scores = JSON.parse(localStorage.getItem("highScores")) || [];
  scores.push({ name: playerName, title: playerTitle, score: score });

  // Sort score highest to lowest
  scores.sort((a, b) => b.score - a.score);

  // Keep only top 8
  scores = scores.slice(0, 8);

  // Save back
  localStorage.setItem("highScores", JSON.stringify(scores));
}

function showScore() {
  resultScreen.classList.remove("active");
  scoreScreen.classList.add("active");

  const tableBody = document.getElementById("score-table-body");
  tableBody.innerHTML = ""; // clear old rows

  // Load stored scores
  let scores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Build table rows
  scores.forEach((player) => {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = player.title;
    row.appendChild(titleCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = player.name;
    row.appendChild(nameCell);

    const scoreCell = document.createElement("td");
    scoreCell.textContent = player.score;
    row.appendChild(scoreCell);

    tableBody.appendChild(row);
  });

    let clearBtn = document.getElementById("clear-scores");

      clearBtn.addEventListener("click", () => {
      localStorage.removeItem("highScores");
      tableBody.innerHTML = ""; // clear the table visually
      alert("Scores cleared!");
    });
  

}




function restartQuiz() {
  resultScreen.classList.remove("active");
  scoreScreen.classList.remove("active");
  quizScreen.classList.add("active");
  startQuiz();
}
