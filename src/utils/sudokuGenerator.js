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
    easy: 26, // 55 clues remaining (81-26)
    medium: 31, // 50 clues
    hard: 36, // 45 clues
    expert: 64, // 17 clues
  };

  const cellsToRemove = difficultySettings[difficulty];
  let attempts = 0;
  let removed = 0;

  while (removed < cellsToRemove && attempts < 500) {
    // Random cell selection with symmetry
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const mirrorRow = 8 - row;
    const mirrorCol = 8 - col;

    // Try primary cell
    if (processCell(row, col)) {
      // Try mirror cell with 70% probability
      if (Math.random() < 0.7 && processCell(mirrorRow, mirrorCol)) {
        removed += 2;
      } else {
        removed++;
      }
    }
    attempts++;
  }

  function processCell(r, c) {
    if (puzzle[r][c] === 0) return false;

    const original = puzzle[r][c];
    puzzle[r][c] = 0;

    if (countSolutions(cloneGrid(puzzle)) === 1) {
      return true;
    } else {
      puzzle[r][c] = original;
      return false;
    }
  }

  // Ensure minimum 17 clues for expert
  if (difficulty === "expert") {
    let clues = puzzle.flat().filter((x) => x !== 0).length;
    while (clues < 17) {
      const r = Math.floor(Math.random() * 9);
      const c = Math.floor(Math.random() * 9);
      if (puzzle[r][c] === 0) {
        puzzle[r][c] = grid[r][c];
        clues++;
      }
    }
  }

  return puzzle;
};

// Deep clone helper for grids
const cloneGrid = (grid) => grid.map((row) => [...row]);

export const verifyPuzzleUniqueness = (puzzle) => {
  // Convert to simple number grid for solver
  const numberGrid = puzzle.map((row) => row.map((cell) => cell.value));

  return countSolutions(numberGrid) === 1;
};

// Main generator function
export const generateNewPuzzle = (difficulty = "medium") => {
  let puzzle;
  let solvedGrid;
  let attempts = 0;

  do {
    if (attempts++ > 200) throw new Error("Could not generate puzzle");
    solvedGrid = createFilledGrid();
    puzzle = removeNumbers(solvedGrid, difficulty);
  } while (!verifyPuzzleUniqueness(puzzle));

  return puzzle.map((row, rowIndex) =>
    row.map((cell, colIndex) => ({
      value: cell,
      isFixed: cell !== 0,
      solution: solvedGrid[rowIndex][colIndex],
      notes: [],
    }))
  );
};

const countSolutions = (grid) => {
  let count = 0;
  const tempGrid = grid.map((row) => row.map((cell) => cell));

  const solveForCount = (row, col) => {
    if (row === 9) {
      count++;
      return count > 1; // Stop early if multiple solutions
    }
    if (col === 9) return solveForCount(row + 1, 0);
    if (tempGrid[row][col] !== 0) return solveForCount(row, col + 1);

    for (let num = 1; num <= 9 && count < 2; num++) {
      if (isValid(tempGrid, row, col, num)) {
        tempGrid[row][col] = num;
        if (solveForCount(row, col + 1)) break;
        tempGrid[row][col] = 0;
      }
    }
    return count > 1;
  };

  solveForCount(0, 0);
  return count;
};
