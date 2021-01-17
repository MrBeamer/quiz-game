"use strict";

const usernameEl = document.getElementById("username");
const saveScoreBtnEL = document.getElementById("save-score-btn");
const finalScoreEl = document.getElementById("final-score");
// Import score from quiz js with the help of local storage property of window
const mostRecentScore = localStorage.getItem("mostRecentScore");
// Updates final score with the local storage score
finalScoreEl.textContent = mostRecentScore;

const maxHighScoreList = 3;
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

usernameEl.addEventListener("keyup", function () {
  saveScoreBtnEL.disabled = !usernameEl.value;
});

function saveHighscore(event) {
  console.log("clicked the submit button");
  event.preventDefault();

  const score = {
    score: mostRecentScore,
    name: usernameEl.value,
  };
  highscores.push(score);
  highscores.sort((a, b) => {
    b.score - a.score;
  });
  highscores.splice(3);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  window.location.assign("/");
}
