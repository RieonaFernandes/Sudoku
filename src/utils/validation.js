export const validateSolution = (board) => {
  // First check: All cells must be filled
  if (board.some((row) => row.some((cell) => cell.value === 0))) return false;
  // Then verify against solution
  return board.every((row, r) =>
    row.every((cell, c) => cell.value === cell.solution)
  );
};

const validateRows = (board) => {
  for (let row of board) {
    const numbers = new Set();
    for (let cell of row) {
      const num = cell.value;
      if (numbers.has(num)) return false;
      numbers.add(num);
    }
  }
  return true;
};

const validateColumns = (board) => {
  for (let col = 0; col < 9; col++) {
    const numbers = new Set();
    for (let row = 0; row < 9; row++) {
      const num = board[row][col].value;
      if (numbers.has(num)) return false;
      numbers.add(num);
    }
  }
  return true;
};

const validateSubgrids = (board) => {
  for (let gridRow = 0; gridRow < 3; gridRow++) {
    for (let gridCol = 0; gridCol < 3; gridCol++) {
      const numbers = new Set();
      const startRow = gridRow * 3;
      const startCol = gridCol * 3;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const num = board[startRow + i][startCol + j].value;
          if (num === 0) continue;
          if (numbers.has(num)) return false;
          numbers.add(num);
        }
      }
    }
  }
  return true;
};

// Check individual cell validity
export const isCellValid = (board, row, col) => {
  const value = board[row][col].value;
  if (value === 0) return true;

  // Check against solution first
  if (value !== board[row][col].solution) return false;

  // Check row
  for (let c = 0; c < 9; c++) {
    if (c !== col && board[row][c].value === value) return false;
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (r !== row && board[r][col].value === value) return false;
  }

  // Check subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if ((i !== row || j !== col) && board[i][j].value === value) return false;
    }
  }

  return true;
};
