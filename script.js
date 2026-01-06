const board = Array(9).fill(null);
console.log(board);

const players = [
  { name: "Player 1", symbol: "X" },
  { name: "Player 2", symbol: "O" },
];

let currentPlayerIndex = 0;

function playMove(index) {
  if (board[index] !== null) {
    console.log("Case déjà occupée");
    return;
  }

  board[index] = players[currentPlayerIndex].symbol;
  currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  printBoard();
}

function printBoard() {
  console.log(`
   ${board[0] || " "} | ${board[1] || " "} | ${board[2] || " "}
  ---+---+---
   ${board[3] || " "} | ${board[4] || " "} | ${board[5] || " "}
  ---+---+---
   ${board[6] || " "} | ${board[7] || " "} | ${board[8] || " "}
  `);
}

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