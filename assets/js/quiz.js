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

// Quiz data
const quizData = [
  // Pride and Prejudice
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    options: [
      "Pride and Prejudice",
      "Sense and Sensibility",
      "Persuasion",
      "Emma",
    ],
    answer: "Pride and Prejudice",
  },
  {
    quote: "You must allow me to tell you how ardently I admire and love you.",
    options: [
      "Persuasion",
      "Mansfield Park",
      "Pride and Prejudice",
      "Northanger Abbey",
    ],
    answer: "Pride and Prejudice",
  },

  // Sense and Sensibility
  {
    quote:
      "Know your own happiness. You want nothing but patience — or give it a more fascinating name, call it hope.",
    options: ["Sense and Sensibility", "Emma", "Persuasion", "Mansfield Park"],
    answer: "Sense and Sensibility",
  },
  {
    quote: "It isn't what we say or think that defines us, but what we do.",
    options: [
      "Sense and Sensibility",
      "Emma",
      "Pride and Prejudice",
      "Northanger Abbey",
    ],
    answer: "Sense and Sensibility",
  },

  // Persuasion
  {
    quote:
      "I can listen no longer in silence. I must speak to you by such means as are within my reach.",
    options: ["Emma", "Persuasion", "Mansfield Park", "Pride and Prejudice"],
    answer: "Persuasion",
  },
  {
    quote: "You pierce my soul. I am half agony, half hope.",
    options: [
      "Persuasion",
      "Sense and Sensibility",
      "Northanger Abbey",
      "Emma",
    ],
    answer: "Persuasion",
  },
    {
    quote: `"My idea of good company...is the company of clever, well-informed people, who have a great deal of conversation; that is what I call good company."
               "You are mistaken," said he gently, "that is not good company, that is the best." `,
    options: ["Emma", "Sense and Sensibility", "Persuasion", "Pride and Prejudice" ],
    answer: "Persuasion",
  },

  // Emma
  {
    quote:
      "I always deserve the best treatment because I never put up with any other.",
    options: [
      "Mansfield Park",
      "Sense and Sensibility",
      "Emma",
      "Pride and Prejudice",
    ],
    answer: "Emma",
  },
  {
    quote:
      "Silly things do cease to be silly if they are done by sensible people in an impudent way.",
    options: ["Emma", "Persuasion", "Northanger Abbey", "Mansfield Park"],
    answer: "Emma",
  },

  // Mansfield Park
  {
    quote: "A large income is the best recipe for happiness I ever heard of.",
    options: ["Sense and Sensibility", "Mansfield Park", "Emma", "Persuasion"],
    answer: "Mansfield Park",
  },
  {
    quote:
      "We have all a better guide in ourselves, if we would attend to it, than any other person can be.",
    options: [
      "Northanger Abbey",
      "Emma",
      "Mansfield Park",
      "Pride and Prejudice",
    ],
    answer: "Mansfield Park",
  },

  // Northanger Abbey
  {
    quote:
      "Friendship is certainly the finest balm for the pangs of disappointed love.",
    options: [
      "Sense and Sensibility",
      "Northanger Abbey",
      "Pride and Prejudice",
      "Persuasion",
    ],
    answer: "Northanger Abbey",
  },
  {
    quote:
      "If adventures will not befall a young lady in her own village, she must seek them abroad.",
    options: [
      "Northanger Abbey",
      "Persuasion",
      "Emma",
      "Sense and Sensibility",
    ],
    answer: "Northanger Abbey",
  },

  // Extra quotes (Lady Susan + general wisdom)
  {
    quote:
      "Where youth and diffidence are united, it requires uncommon steadiness of reason to resist the attraction of being called the most charming girl in the world.",
    options: ["Lady Susan", "Mansfield Park", "Emma", "Persuasion"],
    answer: "Lady Susan",
  },
  {
    quote:
      "Selfishness must always be forgiven you know, because there is no hope of a cure.",
    options: [
      "Pride and Prejudice",
      "Sense and Sensibility",
      "Emma",
      "Mansfield Park",
    ],
    answer: "Pride and Prejudice",
  },
  {
    quote:
      "One half of the world cannot understand the pleasures of the other.",
    options: ["Emma", "Mansfield Park", "Pride and Prejudice", "Persuasion"],
    answer: "Emma",
  }
];

let num = 2;
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
    let name = localStorage.getItem("playerName");
    let title = localStorage.getItem("playerTitle");
    document.querySelector(".title-display").textContent = title +" "+ name;
     
  let finalScore = localStorage.setItem("playerScore", score);
}

function showScore() {
  resultScreen.classList.remove("active");
  scoreScreen.classList.add("active");
  
  // get the data
  let name = localStorage.getItem("playerName");
  let score = localStorage.getItem("playerScore");
  console.log(name, score);
  document.querySelector(".name-display").textContent = name;

  // 4. Show data on page
  document.querySelector(".final-score").textContent = score;
  document.getElementById("high-score").textContent = 10;
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  scoreScreen.classList.remove("active");
  quizScreen.classList.add("active");
  startQuiz();
}
