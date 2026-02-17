import Bird from "./bird.js";
import Pipes from "./pipes.js";
import Score from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.getElementById("score");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

let bird;
let pipes;
let score;

let lastTime = 0;
let gameRunning = false;

function init() {
  bird = new Bird(canvas.height);
  pipes = new Pipes(canvas.width, canvas.height);
  score = new Score();
  score.reset();
  scoreDisplay.textContent = "0";
}

function startGame() {
  init();
  startScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  gameRunning = true;
  requestAnimationFrame(gameLoop);
}

function gameOver() {
  gameRunning = false;
  finalScore.textContent = score.value;
  gameOverScreen.classList.remove("hidden");
}

function gameLoop(timestamp) {
  if (!gameRunning) return;

  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.update(canvas.height);
  pipes.update(deltaTime);

  bird.draw(ctx);
  pipes.draw(ctx);

  if (pipes.checkCollision(bird)) {
    gameOver();
    return;
  }

  scoreDisplay.textContent = score.value;

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (!gameRunning) {
      startGame();
    } else {
      bird.flap();
    }
  }
});

canvas.addEventListener("click", () => {
  if (!gameRunning) {
    startGame();
  } else {
    bird.flap();
  }
});

restartBtn.addEventListener("click", startGame);

init();
