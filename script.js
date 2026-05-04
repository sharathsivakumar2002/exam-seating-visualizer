let board = [];
let n = 8;

function createBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  boardDiv.style.gridTemplateColumns = `repeat(${n}, 55px)`;

  let placed = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (board[i][j] === 1) {
        cell.classList.add("student");
        cell.innerText = "S";
        placed++;
      }

      boardDiv.appendChild(cell);
    }
  }

  document.getElementById("placed").innerText = placed;
}

function isSafe(row, col) {
  for (let i = 0; i < row; i++)
    if (board[i][col]) return false;

  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
    if (board[i][j]) return false;

  for (let i = row, j = col; i >= 0 && j < n; i--, j++)
    if (board[i][j]) return false;

  return true;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function solve(row = 0) {
  if (row === n) {
    document.getElementById("status").innerText = "Completed";
    return true;
  }

  for (let col = 0; col < n; col++) {
    if (isSafe(row, col)) {
      board[row][col] = 1;
      createBoard();

      await sleep(getSpeed());

      if (await solve(row + 1)) return true;

      board[row][col] = 0;
      createBoard();

      await sleep(getSpeed());
    }
  }

  return false;
}

function getSpeed() {
  return parseInt(document.getElementById("speed").value);
}

async function start() {
  n = parseInt(document.getElementById("size").value);
  board = Array.from({ length: n }, () => Array(n).fill(0));

  document.getElementById("status").innerText = "Generating...";
  createBoard();

  const success = await solve();

  if (!success)
    document.getElementById("status").innerText = "No Solution";
}

createBoard();
