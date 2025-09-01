// DOM Elements

const quizScreen = document.getElementById("quiz-screen");
const questionText = document.getElementById("question-text");
const quoteElement = document.querySelector(".quote");
const quizCard = document.querySelector(".quiz-card");

//options Buttons
const button1 = document.getElementById("option1");
const button2 = document.getElementById("option2");
const button3 = document.getElementById("option3");
const button4 = document.getElementById("option4");

const optionButtons = [button1, button2, button3, button4];

// 1. Quiz data
const quizData = [
  {
    quote: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.`,
    answer: "Pride and Prejudice",
    options: [
      "Pride and Prejudice",
      "Sense and Sensibility",
      "Emma",
      "Persuasion",
    ],
  },
  {
    quote: "You pierce my soul. I am half agony, half hope.",
    answer: "Persuasion",
    options: ["Mansfield Park", "Emma", "Persuasion", "Northanger Abbey"],
  },
  {
    quote:
      "Know your own happiness. You want nothing but patience - or give it a more fascinating name: call it hope.",
    answer: "Sense and Sensibility",
    options: [
      "Sense and Sensibility",
      "Pride and Prejudice",
      "Emma",
      "Persuasion",
    ],
  },
  {
    quote: `I always deserve the best treatment because I never put up with any other.`,
    answer: "Emma",
    options: [
      "Emma",
      "Sense and Sensibility",
      "Mansfield Park",
      "Pride and Prejudice",
    ],
  },
  {
    quote: `"My idea of good company...is the company of clever, well-informed people, who have a great deal of conversation; that is what I call good company."
               "You are mistaken," said he gently, "that is not good company, that is the best." `,
    answer: "Persuasion",
    options: [
      "Emma",
      "Sense and Sensibility",
      "Persuasion",
      "Pride and Prejudice",
    ],
  },
];

let currentQuestion = 0;
let score = 0;

startQuiz();

function startQuiz() {
  // reset variables
  currentQuestion = 0;
  score = 0;
  
  showQuestion();
}

function showQuestion() {

  // reset state
  const question = quizData[currentQuestion];

  // Show the quote
  quoteElement.textContent = `${question.quote}`;
  
  // Create buttons
  button1.textContent = `${question.options[0]}`;
  button2.textContent = `${question.options[1]}`;
  button3.textContent = `${question.options[2]}`;
  button4.textContent = `${question.options[3]}`;

  button1.addEventListener("click", () => checkAnswer(button1, question.answer));
  button2.addEventListener("click", () => checkAnswer(button2, question.answer));
  button3.addEventListener("click", () => checkAnswer(button3, question.answer));
  button4.addEventListener("click", () => checkAnswer(button4, question.answer));

}

function checkAnswer(clickedButton, correctAnswer) {
  
    if (clickedButton.textContent === correctAnswer) {
      alert("correct"); 
    score++; 
    console.log(score);
    } else if (clickedButton.textContent !== correctAnswer) {
    alert("wrong");
       
  } 
  };
   
