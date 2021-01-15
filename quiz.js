const url = "https://opentdb.com/api.php?amount=20&type=boolean";
let questionEl = document.querySelector(".question");
let correctAnswerEl = document.querySelector(".correct-answer");
let categorEl = document.querySelector(".category");
let difficultyEl = document.querySelector(".difficulty");
let incorrectAnswersEl = document.querySelector(".incorrect-answers");
const btnNextQuestion = document.querySelector(".next-question");

function randomQuizRound() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const question = _.unescape(data.results[1].question); //_.escape; this method converts the HTML entities &amp;, &lt;, &gt;, &quot;, and &#39; in string to their corresponding characters.
      const correctAnswer = _.unescape(data.results[1].correct_answer);
      const category = data.results[1].category;
      const difficulty = data.results[1].difficulty;
      const incorrectAnswers = _.unescape(data.results[1].incorrect_answers);
      questionEl.textContent = question;
      correctAnswerEl.textContent = correctAnswer;
      categorEl.textContent = category;
      difficultyEl.textContent = difficulty;
      incorrectAnswersEl.textContent = incorrectAnswers;
      console.log(incorrectAnswers);
      //testing
    });
}

function correct() {}

btnNextQuestion.addEventListener("click", randomQuizRound);
