import { useState, useEffect } from "react";
import SudokuBoard from "./SudokuBoard";
import GameControls from "./GameControls";
import DifficultySelector from "./DifficultySelector";
import GameWonModal from "./GameWonModal";
import Timer from "./Timer";
import StartModal from "./StartModal";
import ConfirmationModal from "./ConfirmationModal";
import { generateNewPuzzle } from "../utils/sudokuGenerator";
import { validateSolution, isCellValid } from "../utils/validation";
import { cloneBoard } from "../utils/helpers";
import BackspaceIcon from "./icons/backspace";

const SudokuGame = () => {
  const [board, setBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [conflicts, setConflicts] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showStartModal, setShowStartModal] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Initialize game on mount and difficulty change
  useEffect(() => {
    if (gameStarted) {
      initializeGame(difficulty);
    }
  }, [gameStarted]);

  // Track timer
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const initializeGame = (selectedDifficulty) => {
    const newPuzzle = generateNewPuzzle(selectedDifficulty);
    setBoard(newPuzzle);
    setSelectedCell(null);
    setConflicts([]);
    setGameWon(false);
    setSecondsElapsed(0);
    // setDifficulty(selectedDifficulty);
    setIsTimerRunning(true);
    setGameStarted(true);
  };

  // Handle cell selection
  const handleCellSelect = (row, col) => {
    if (!board[row][col].isFixed) {
      setSelectedCell((prev) =>
        prev?.row === row && prev?.col === col ? null : { row, col }
      );
    }
  };

  // Handle number input from keyboard or number pad
  const handleNumberInput = (number) => {
    if (!selectedCell || board[selectedCell.row][selectedCell.col].isFixed)
      return;

    // const newBoard = board.map((row) => [...row]);
    const newBoard = cloneBoard(board);
    const { row, col } = selectedCell;

    // Update cell value
    newBoard[row][col].value = number;

    // Check validity
    const isValid = isCellValid(newBoard, row, col);
    const newConflicts = isValid
      ? conflicts.filter((c) => !(c.row === row && c.col === col))
      : [...conflicts, { row, col }];

    // Check if board is complete and valid
    const isComplete = newBoard.every((row) =>
      row.every((cell) => cell.value !== 0)
    );

    setBoard(newBoard);

    setConflicts(newConflicts);

    if (isComplete && validateSolution(newBoard)) {
      setGameWon(true);
      setIsTimerRunning(false);
    }
  };

  // Keyboard input handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedCell) {
        const number = parseInt(e.key);
        if (number >= 1 && number <= 9) {
          handleNumberInput(number);
        } else if (e.key === "Backspace" || e.key === "Delete") {
          handleNumberInput(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedCell]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {showStartModal && (
        <StartModal
          onStart={(selectedDifficulty) => {
            setDifficulty(selectedDifficulty);
            setShowStartModal(false);
            initializeGame(selectedDifficulty);
          }}
        />
      )}

      {gameStarted && (
        <>
          <div className="flex items-center justify-center text-sm font-medium text-gray-700 gap-6">
            Mode: {difficulty}
          </div>

          <div className="mb-6">
            <Timer seconds={secondsElapsed} />
          </div>
          <SudokuBoard
            board={board}
            selectedCell={selectedCell}
            conflicts={conflicts}
            onCellSelect={handleCellSelect}
          />
          {/* Number input pad */}
          <div className="mt-6 grid grid-cols-5 gap-2 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                className="aspect-square bg-blue-100 rounded hover:bg-blue-200 
                     transition-colors font-medium text-lg"
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handleNumberInput(0)}
              className="col-span-1 bg-red-100 rounded hover:bg-red-200
          transition-colors flex items-center justify-center"
              aria-label="Clear cell"
            >
              <BackspaceIcon />
            </button>
          </div>
          <GameControls
            // onNewGame={() => initializeGame()}
            onNewGame={() => setShowConfirmation(true)}
            // onCheckSolution={() => {
            //   if (validateSolution(board)) setGameWon(true);
            //   else alert("Solution contains errors!");
            // }}
          />
          {/* Add confirmation modal rendering */}
          {showConfirmation && (
            <ConfirmationModal
              onConfirm={() => {
                window.location.reload(false);
              }}
              onCancel={() => setShowConfirmation(false)}
            />
          )}
          {gameWon && (
            <GameWonModal
              onClose={() => setGameWon(false)}
              onNewGame={() => window.location.reload(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SudokuGame;
