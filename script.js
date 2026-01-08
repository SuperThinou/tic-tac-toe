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
const frameContainer = document.querySelector(".frame-container");
const frames = document.querySelectorAll(".frame");
const newGameBtn = document.querySelector(".new-game-btn");
const winningPlayerText = document.querySelector("#winningPlayerText");

// Game Algo
function playMove(index) {
  if (gameOver) return;

  if (board[index] !== null) {
    console.log("Case déjà occupée");
    return;
  }

  board[index] = players[currentPlayerIndex].symbol;
  currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  checkWinner();
}

function checkWinner() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winningPlayerText.textContent = "Player " + board[a] + " wins!";
      gameOver = true;
    }
  }
  if (board.every((cell) => cell !== null)) {
    winningPlayerText.textContent = "It's a tie!";
    gameOver = true;
  }
}

// UI
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
