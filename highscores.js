"use strict";

const highScoreListEl = document.getElementById("highscore-list");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highscores);

highscores.forEach((score) => {
  const highScoreListPosition = document.createElement("li");
  highScoreListPosition.classList.add("high-score");
  highScoreListPosition.textContent = `${score.name} - ${score.score}`;
  highScoreListEl.appendChild(highScoreListPosition);
  highScoreListEl.appendChild;
});
