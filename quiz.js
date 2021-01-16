"use strict";

const questionEl = document.getElementById("question");
const answerEl = Array.from(document.getElementsByClassName("answer-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const correctPoints = 10;
const maxQuestions = 2;

let questions = [
  {
    question: "Who is richer?",
    answer1: "Kanye West",
    answer2: "Big but Kim",
    answer3: "P.Diddy",
    answer4: "Golum",
    correctAnswer: 4,
  },
  {
    question: "Who is nicer?",
    answer1: "Winnie Pooh",
    answer2: "Bob the Builder",
    answer3: "Morty",
    answer4: "Wall-E",
    correctAnswer: 3,
  },
];

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    // go the end page
    return window.location.assign("/game-over.html");
  }
  questionCounter++;
  // Get a randomNumber, so that a random question(object) can get picked from the array
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionEl.textContent = currentQuestion.question;

  // Iteration over the array of answer divs - to change the content text of each of them
  // with dataset its easier option b would be a counter to increment the number
  answerEl.forEach((answer) => {
    const dataNumber = answer.dataset.number;
    answer.textContent = currentQuestion[`answer${dataNumber}`];
  });
  // Slices the used question from the array
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

answerEl.forEach((answer) => {
  console.log(answer);
  answer.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;

    console.log(selectedAnswer);
    getNewQuestion();
  });
});

startGame();

// const url = "https://opentdb.com/api.php?amount=20&type=boolean";
// let questionEl = document.querySelector(".question");
// let correctAnswerEl = document.querySelector(".correct-answer");
// let categorEl = document.querySelector(".category");
// slet difficultyEl = document.querySelector(".difficulty");
// let incorrectAnswersEl = document.querySelector(".incorrect-answers");
// const btnNextQuestion = document.querySelector(".next-question");

// function randomQuizRound() {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       const question = _.unescape(data.results[1].question); //_.escape; this method converts the HTML entities &amp;, &lt;, &gt;, &quot;, and &#39; in string to their corresponding characters.
//       const correctAnswer = _.unescape(data.results[1].correct_answer);
//       const category = data.results[1].category;
//       const difficulty = data.results[1].difficulty;
//       const incorrectAnswers = _.unescape(data.results[1].incorrect_answers);
//       questionEl.textContent = question;
//       correctAnswerEl.textContent = correctAnswer;
//       categorEl.textContent = category;
//       difficultyEl.textContent = difficulty;
//       incorrectAnswersEl.textContent = incorrectAnswers;
//       console.log(incorrectAnswers);
//       //testing
//     });
// }

// function correct() {}

// btnNextQuestion.addEventListener("click", randomQuizRound);
