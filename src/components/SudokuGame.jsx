import { useState, useEffect } from "react";
import SudokuBoard from "./SudokuBoard";
import GameControls from "./GameControls";
import { generateNewPuzzle } from "../utils/sudokuGenerator";

const SudokuGame = () => {
  const [board, setBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");

  // Initialize game on mount and difficulty change
  useEffect(() => {
    initializeGame(difficulty);
  }, [difficulty]);

  const initializeGame = (selectedDifficulty = difficulty) => {
    const newPuzzle = generateNewPuzzle(selectedDifficulty);
    setBoard(newPuzzle);
    setSelectedCell(null);
    setConflicts([]);
  };

  const handleCellSelect = (row, col) => {
    if (!board[row][col].isFixed) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (number) => {
    if (!selectedCell || board[selectedCell.row][selectedCell.col].isFixed)
      return;

    const newBoard = board.map((row) => [...row]);
    newBoard[selectedCell.row][selectedCell.col].value = number;
    setBoard(newBoard);

    const newConflicts = checkConflicts(
      selectedCell.row,
      selectedCell.col,
      number
    );
    setConflicts(newConflicts);
  };

  const checkConflicts = (row, col, value) => {
    const conflicts = [];

    // Check row conflicts
    board[row].forEach((cell, colIndex) => {
      if (colIndex !== col && cell.value === value) {
        conflicts.push({ row, col: colIndex });
      }
    });

    // Check column conflicts
    board.forEach((rowData, rowIndex) => {
      if (rowIndex !== row && rowData[col].value === value) {
        conflicts.push({ row: rowIndex, col });
      }
    });

    // Check 3x3 grid conflicts
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (i !== row && j !== col && board[i][j].value === value) {
          conflicts.push({ row: i, col: j });
        }
      }
    }

    return conflicts;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <SudokuBoard
        board={board}
        selectedCell={selectedCell}
        conflicts={conflicts}
        onCellSelect={handleCellSelect}
        onNumberInput={handleNumberInput}
      />

      <GameControls onNewGame={() => initializeGame()} />
    </div>
  );
};

export default SudokuGame;
