// Algo variables
const board = Array(9).fill(null);

const players = [
  { name: "Player 1", symbol: "X" },
  { name: "Player 2", symbol: "O" },
];

let currentPlayerIndex = 0;
let gameOver = false;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// DOM variables
const nameFormTitle = document.querySelector("#nameFormTitle");
const form = document.querySelector("form");
const inputPlayer1 = document.querySelector("#inputPlayer1");
const inputPlayer2 = document.querySelector("#inputPlayer2");
const saveNameBtn = document.querySelector("#saveNameBtn");

const frameContainer = document.querySelector(".frame-container");
const frames = document.querySelectorAll(".frame");
const newGameBtn = document.querySelector(".new-game-btn");
const winningPlayerText = document.querySelector("#winningPlayerText");

// Game Algo
function playMove(index) {
  if (board[index] || gameOver) return;

  board[index] = players[currentPlayerIndex].symbol;
  currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  checkWinner();
}

function checkWinner() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winningPlayerText.textContent =
        players[a].name + " (" + board[a] + ") " + " wins!";
      gameOver = true;
    }
  }
  if (board.every((cell) => cell !== null)) {
    winningPlayerText.textContent = "It's a tie!";
    gameOver = true;
  }
}

// UI

nameFormTitle.addEventListener("click", () => {
  form.classList.toggle("hidden");
  newGameBtn.classList.toggle("hidden");
});

saveNameBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputPlayer1.value.trim() !== "") {
    players[0].name = inputPlayer1.value;
  }

  if (inputPlayer2.value.trim() !== "") {
    players[1].name = inputPlayer2.value;
  }

  form.classList.toggle("hidden");
  newGameBtn.classList.toggle("hidden");
});

frameContainer.addEventListener("click", (e) => {
  const index = Number(e.target.dataset.index);

  if (e.target.textContent === "" && gameOver === false)
    e.target.textContent = players[currentPlayerIndex].symbol;

  playMove(index);
});

newGameBtn.addEventListener("click", () => {
  frames.forEach((frame) => {
    frame.textContent = "";
  });
  board.fill(null);
  winningPlayerText.textContent = "";
  gameOver = false;
});
