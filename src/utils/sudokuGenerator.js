// Helper function to shuffle arrays
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Validate number placement
const isValid = (grid, row, col, num) => {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) return false;
  }

  // Check 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
};

// Create a complete valid Sudoku grid
const createFilledGrid = () => {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Fill diagonal subgrids
  const fillSubgrid = (startRow, startCol) => {
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[startRow + i][startCol + j] = nums[i * 3 + j];
      }
    }
  };

  for (let i = 0; i < 9; i += 3) {
    fillSubgrid(i, i);
  }

  // Solve remaining cells
  const solve = (row, col) => {
    if (row === 9) return true;
    if (col === 9) return solve(row + 1, 0);
    if (grid[row][col] !== 0) return solve(row, col + 1);

    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const num of nums) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
        if (solve(row, col + 1)) return true;
        grid[row][col] = 0;
      }
    }
    return false;
  };

  solve(0, 0);
  return grid;
};

// Remove numbers based on difficulty
const removeNumbers = (grid, difficulty) => {
  const puzzle = grid.map((row) => [...row]);
  const difficultySettings = {
    easy: 35, // ~35 cells remaining
    medium: 28, // ~28 cells remaining
    hard: 22, // ~22 cells remaining
  };

  const cellsToRemove = 81 - difficultySettings[difficulty];
  const cells = shuffle(
    Array.from({ length: 81 }, (_, i) => ({
      row: Math.floor(i / 9),
      col: i % 9,
    }))
  );

  let removed = 0;
  for (const { row, col } of cells) {
    if (removed >= cellsToRemove) break;

    // Try removing the cell while maintaining uniqueness
    const original = puzzle[row][col];
    puzzle[row][col] = 0;
    removed++;
  }

  return puzzle;
};

// Main generator function
export const generateNewPuzzle = (difficulty = "medium") => {
  const solvedGrid = createFilledGrid();
  const puzzle = removeNumbers(solvedGrid, difficulty);

  return puzzle.map((row, rowIndex) =>
    row.map((cell, colIndex) => ({
      value: cell,
      isFixed: cell !== 0,
      solution: solvedGrid[rowIndex][colIndex],
      notes: [],
    }))
  );
};
