"use strict";

// Select Elements
const container = document.querySelector(".cell_container");
const startBtn = document.querySelector(".start_gameBtn");
let playerX = document.querySelector(".player_X");
let playerO = document.querySelector(".player_O");
const scoreX = document.querySelector(".player_X_score");
const scoreO = document.querySelector(".player_O_score");
const tie = document.querySelector(".tie_score");
const message = document.querySelector(".message");
const round = document.querySelector(".game_round");

// Declare global variables
let winRound,
  activePlayer,
  playing,
  gamerounds,
  scorePlayerO,
  scorePlayerX,
  scoreTie,
  playerMoves;

// variable with all possible win combinations
let winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Starting conditions
gamerounds = 3;
round.textContent = `${gamerounds} of 3`;
scorePlayerX = 0;
scorePlayerO = 0;
scoreTie = 0;
scoreX.textContent = scorePlayerX;
scoreO.textContent = scorePlayerO;
tie.textContent = scoreTie;

// CALLBACK Functions

// Display Message
const displayMessage = function (text) {
  message.textContent = text;
};

// Initialization function

const init = function () {
  // Declare variables
  activePlayer = "❌";
  playing = true;
  // variable with each player's move
  playerMoves = ["", "", "", "", "", "", "", "", ""];

  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  displayMessage("");
  playerX.classList.add("player_active");
  playerO.classList.remove("player_active");
};
init();

// Update Final Winner
const displayFinalWinner = function () {
  if (scorePlayerX > scorePlayerO && scorePlayerX > scoreTie) {
    displayMessage(`Game Over! Final winner is ❌`);
  } else if (scorePlayerO > scorePlayerX && scorePlayerO > scoreTie) {
    displayMessage(`Game Over! Final winner is ⭕`);
  } else {
    displayMessage(`Game Over! This is a tie!`);
  }
};

// Update Score and Game Round
const updateScore = function () {
  if ((activePlayer = "❌" && winRound)) {
    scorePlayerX++;
    scoreX.textContent = scorePlayerX;
  } else if ((activePlayer = "⭕" && winRound)) {
    scorePlayerO++;
    scoreO.textContent = scorePlayerO;
  } else if (tie) {
    scoreTie++;
    tie.textContent = scoreTie;
  }
  console.log(scorePlayerX, scorePlayerO);
};

// Update Game round
const updateGameRound = function () {
  if (gamerounds > 1) {
    gamerounds--;
    round.textContent = `${gamerounds} of 3`;
  } else {
    displayFinalWinner();
    container.removeEventListener("click", displayCellClick);
    gamerounds = 0;
    round.textContent = `${gamerounds} of 3`;
    startBtn.disabled = true;
  }
};

// check for a winner
const checkWinner = function () {
  winRound = false;
  let tie = !playerMoves.includes("");

  for (let i = 0; i < winConditions.length; i++) {
    let a = playerMoves[winConditions[i][0]];
    let b = playerMoves[winConditions[i][1]];
    let c = playerMoves[winConditions[i][2]];
    if (a == "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      winRound = true;
      break;
    }
  }
  if (winRound) {
    displayMessage(`Player ${activePlayer} is the winner!`);
    updateScore();
    updateGameRound();
    playing = false;
    return;
  }
  if (tie) {
    displayMessage("It's a tie!");
    updateScore();
    updateGameRound();
    playing = false;
    return;
  }
};

// Switch Players
const switchPlayer = function () {
  activePlayer = activePlayer === "❌" ? "⭕" : "❌";
  playerX.classList.toggle("player_active");
  playerO.classList.toggle("player_active");
  console.log(`activePlayer is ${activePlayer}`);
};

// Start Game
const displayCellClick = function (event) {
  event.stopPropagation();
  if (playing) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.id;
    const isDisabled = clickedCell.classList.contains("disabled");

    // check if the clicked cell is empty and add player symbol

    if (playerMoves[clickedCellIndex] !== "" && !playing && isDisabled) {
      return;
    }

    clickedCell.textContent = activePlayer;
    playerMoves[clickedCellIndex] = activePlayer;

    clickedCell.classList.add("disabled");
    console.log(clickedCell);

    checkWinner();
    switchPlayer();
  }
};

// Click Events

container.addEventListener("click", displayCellClick);
startBtn.addEventListener("click", init);
