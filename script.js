let players = document.querySelector(".players");
let seoContent = document.querySelector(".seo-content");
let startBtn = document.querySelector("#start-btn");

let mainContainer = document.querySelector(".main-container");
let turnIndicator = document.querySelector("#turn-indicator");
let container = document.querySelector("main .container");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let playAgainBtn = document.querySelector("#play-again");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let winPlayer = null;
let turnO = true;

//ScoreBoard Var
let scoreBoard = document.querySelector("#scoreboard");
let p1_name = document.querySelector("#p1-name-display");
let p2_name = document.querySelector("#p2-name-display");
let p1_score = document.querySelector("#p1-score");
let p2_score = document.querySelector("#p2-score");
let draw_score = document.querySelector("#draw-score");

const clickSound = new Audio("sounds/click.mp3");
clickSound.preload = "auto";
clickSound.load();

const countSound = new Audio("sounds/count.mp3");
countSound.preload = "auto";
countSound.load();

const soundO = new Audio("sounds/turnO.mp3");
soundO.preload = "auto";
soundO.load();

const soundX = new Audio("sounds/turnX.mp3");
soundX.preload = "auto";
soundX.load();

const winSound = new Audio("sounds/win.mp3");
winSound.preload = "auto";
winSound.load();

const drawSound = new Audio("sounds/draw.mp3");
drawSound.preload = "auto";
drawSound.load();

let player1, player2;
let storeName = () => {
  player1 = document.querySelector("#player1").value;
  player2 = document.querySelector("#player2").value;
  storeScoreBoardNames();
};

function updateTurnIndicator() {
  const name = turnO ? player1 || "Player 1" : player2 || "Player 2";
  const symbol = turnO ? "O" : "X";
  document.getElementById("turn-name").innerText = name;
  document.getElementById("turn-symbol").innerText = symbol;
}

function updateTurnUI() {
  turnIndicator.classList.remove("turn-x", "turn-o");

  if (turnO) {
    turnIndicator.classList.add("turn-o");
  } else {
    turnIndicator.classList.add("turn-x");
  }
}

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

function highlightWinner(pattern) {
  pattern.forEach((index) => {
    boxes[index].classList.add("win-pattern");
  });
  boxes.forEach((box, idx) => {
    if (!pattern.includes(idx)) box.classList.add("fade-box");
  });
}

players.addEventListener("submit", (e) => {
  e.preventDefault();
  startCountdown("start");
});

function doStart() {
  storeName();
  storeScoreBoardNames();

  players.classList.add("hide");
  seoContent.classList.add("hide");

  container.classList.remove("hide");
  resetBtn.classList.remove("hide");

  msgContainer.classList.add("hide");
  mainContainer.classList.remove("hide");
  turnIndicator.classList.remove("hide");

  console.log(player1);
  console.log(player2);

  updateTurnIndicator();
  updateTurnUI();
  players.reset();
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      soundO.currentTime = 0;
      soundO.play();
    } else {
      box.innerText = "X";
      turnO = true;
      soundX.currentTime = 0;
      soundX.play();
    }
    box.disabled = true;

    checkWinner();
    updateTurnIndicator();
    updateTurnUI();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = "";
    box.classList.remove("win-pattern");
    box.classList.remove("fade-box");
  }
};

const showWinner = (winner) => {
  if (winner === "O") {
    winPlayer = player1;
    p1_score.innerText = +p1_score.innerText + 1;
  } else {
    winPlayer = player2;
    p2_score.innerText = +p2_score.innerText + 1;
  }

  msg.innerHTML = `Congratulations, ${winPlayer} won!`;
  msg.classList.add("winner-text");

  msgContainer.classList.remove("hide");

  container.classList.add("hide");
  resetBtn.classList.add("hide");
  mainContainer.classList.add("hide");

  disableBoxes();
};

const showDraw = () => {
  drawSound.currentTime = 0;
  drawSound.play();

  msg.innerText = "It's Draw!";
  draw_score.innerText = Number(draw_score.innerText) + 1;
  msgContainer.classList.remove("hide");

  container.classList.add("add");
  resetBtn.classList.add("add");
  mainContainer.classList.add("hide");

  disableBoxes();
};

const checkWinner = () => {
  for (pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        highlightWinner(pattern);
        disableBoxes();

        setTimeout(() => {
          showWinner(pos1Val);
          winSound.currentTime = 0;
          winSound.play();
        }, 1200);
        return;
      }
    }
  }

  let filledBoxes = 0;
  boxes.forEach((box) => {
    if (box.innerText !== "") {
      filledBoxes++;
    }
  });

  if (filledBoxes === 9) {
    showDraw();
  }
};

function stopAllSounds() {
  winSound.pause();
  winSound.currentTime = 0;

  drawSound.pause();
  drawSound.currentTime = 0;
}

function doReset() {
  clickSound.play();
  winPlayer = null;
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  mainContainer.classList.remove("hide");
  container.classList.remove("hide");
  resetBtn.classList.remove("hide");

  updateTurnIndicator();
  updateTurnUI();
}

function doNewGame() {
  p1_score.innerText = 0;
  p2_score.innerText = 0;
  draw_score.innerText = 0;
  turnO = true;
  winPlayer = null;
  msgContainer.classList.add("hide");
  turnIndicator.classList.add("hide");
  mainContainer.classList.remove("hide");
  players.classList.remove("hide");

  seoContent.classList.remove("hide");

  container.classList.add("hide");
  resetBtn.classList.add("hide");

  enableBoxes();
  updateTurnIndicator();
  updateTurnUI();
}

function doPlayAgain() {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  mainContainer.classList.remove("hide");
  container.classList.remove("hide");
  resetBtn.classList.remove("hide");
  updateTurnIndicator();
  updateTurnUI();
}

function startCountdown(type, seconds = 3) {
  stopAllSounds();
  clickSound.play();
  let counter = seconds;

  const overlay = document.getElementById("countdown-overlay");
  const number = document.getElementById("countdown-number");

  overlay.classList.remove("hide");

  resetBtn.disabled = true;
  newGameBtn.disabled = true;
  playAgainBtn.disabled = true;

  number.innerText = counter;
  setTimeout(() => {
    const interval = setInterval(() => {
      counter--;

      countSound.currentTime = 0;
      countSound.play();

      if (counter > 0) {
        number.innerText = counter;
        if (counter == 3) {
          countdownBeep.playbackRate = 1.0;
        }
        if (counter == 2) {
          countdownBeep.playbackRate = 1.2;
        }
        if (counter == 1) {
          countdownBeep.playbackRate = 1.4;
        }
      } else {
        clearInterval(interval);
        overlay.classList.add("hide");

        resetBtn.disabled = false;
        newGameBtn.disabled = false;
        playAgainBtn.disabled = false;

        if (type === "start") doStart();
        if (type === "playAgain") doPlayAgain();
        if (type === "newGame") doNewGame();
      }
    }, 1000);
  }, 100);
}

newGameBtn.addEventListener("click", () => {
  startCountdown("newGame");
});

resetBtn.addEventListener("click", () => {
  doReset();
});

playAgainBtn.addEventListener("click", () => {
  startCountdown("playAgain");
});

//ScoreBoard
function storeScoreBoardNames() {
  p1_name.innerText = player1;
  p2_name.innerText = player2;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
