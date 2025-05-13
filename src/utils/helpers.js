// Creates a deep clone of the Sudoku board
export const cloneBoard = (board) => {
  return board.map((row) => row.map((cell) => ({ ...cell })));
};
