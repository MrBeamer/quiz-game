"use strict";

const questionEl = document.getElementById("question");
const answerEl = Array.from(document.getElementsByClassName("answer-text"));
const scoreEl = document.getElementById("score");
const progressTextEl = document.getElementById("progress-text");
const progressBarFullEl = document.querySelector(".progress-bar-full");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const correctPoints = 10;
const maxQuestions = 10;

let questions = [];

const url =
  "https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple";
fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answersChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.correctAnswer = Math.floor(Math.random() * 3) + 1;
      answersChoices.splice(
        formattedQuestion.correctAnswer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answersChoices.forEach((choice, index) => {
        formattedQuestion["answer" + (index + 1)] = choice;
      });
      console.log(formattedQuestion);
      return formattedQuestion;
    });
    startGame();
  });

// let questions = [
//   {
//     question: "Who is richer?",
//     answer1: "Kanye West",
//     answer2: "Big but Kim",
//     answer3: "P.Diddy",
//     answer4: "Golum",
//     correctAnswer: 4,
//   },
//   {
//     question: "Who is nicer?",
//     answer1: "Winnie Pooh",
//     answer2: "Bob the Builder",
//     answer3: "Morty",
//     answer4: "Wall-E",
//     correctAnswer: 3,
//   },
// ];

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    // go the end page
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  // Updates how many questions have been answered of the max questions
  progressTextEl.textContent = `Question ${questionCounter}/${maxQuestions}`;
  // Updates the width and simultaneously the visually progress of the bar
  progressBarFullEl.style.width = `${(questionCounter / maxQuestions) * 100}%`;

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

    const classToApply =
      selectedAnswer == currentQuestion.correctAnswer ? "correct" : "incorrect";
    if (selectedAnswer == currentQuestion.correctAnswer) {
      scoreEl.textContent = score += correctPoints;
    }
    selectedChoice.classList.add(classToApply);
    // delays the remove-class and the call of the next question
    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1100);
  });
});
