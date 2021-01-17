"use strict";

const usernameEl = document.getElementById("username");
const saveScoreBtnEL = document.getElementById("save-score-btn");
const finalScoreEl = document.getElementById("final-score");
// Import score from quiz js with the help of local storage property of window
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalScoreEl.textContent = mostRecentScore;

usernameEl.addEventListener("keyup", function () {
  saveScoreBtnEL.disabled = !usernameEl.value;
});

saveHighscore = (event) => {
  console.log("clicked the submit button");
  console.log(event);
  event.preventDefault();
};
