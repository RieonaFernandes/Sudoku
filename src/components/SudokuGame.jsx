import { useState, useEffect } from "react";
import SudokuBoard from "./SudokuBoard";
import GameControls from "./GameControls";
import GameWonModal from "./GameWonModal";
import Timer from "./Timer";
import StartModal from "./StartModal";
import ConfirmationModal from "./ConfirmationModal";
import GameOverModal from "./GameOverModal";
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
  const [cluesUsed, setCluesUsed] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [isPencilMode, setIsPencilMode] = useState(false);
  const totalClues = 4;
  const totalMistakes = 3;

  // Initialize game on mount and difficulty change
  useEffect(() => {
    if (gameStarted) {
      initializeGame(difficulty);
    }
  }, [gameStarted]);

  // Track timer
  useEffect(() => {
    let interval;
    if (isTimerRunning && !isTimerPaused) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isTimerPaused]);

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
    setCluesUsed(0);
    setMistakes(0);
    setGameOver(false);
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
    if (
      !selectedCell ||
      board[selectedCell.row][selectedCell.col].isFixed ||
      gameOver
    )
      return;

    // const newBoard = board.map((row) => [...row]);
    const newBoard = cloneBoard(board);
    const { row, col } = selectedCell;

    //pencil marks
    const cell = newBoard[row][col];

    if (isPencilMode) {
      if (number === 0) {
        cell.notes = [];
      } else {
        const index = cell.notes.indexOf(number);
        if (index === -1) {
          cell.notes = [...cell.notes, number].sort((a, b) => a - b);
        } else {
          cell.notes = cell.notes.filter((n) => n !== number);
        }
      }
      setBoard(newBoard);
      return;
    }

    // Update cell value
    newBoard[row][col].value = number;

    cell.value = number;
    cell.notes = [];

    // Check validity
    const isValid = isCellValid(newBoard, row, col);
    const newConflicts = isValid
      ? conflicts.filter((c) => !(c.row === row && c.col === col))
      : [...conflicts, { row, col }];
    if (!isValid) {
      setMistakes((prev) => prev + 1);
    }
    if (mistakes + 1 >= totalMistakes) {
      setGameOver(true);
      setIsTimerRunning(false);
    }

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

  const handleClue = () => {
    if (!selectedCell || cluesUsed >= totalClues) return;

    const newBoard = cloneBoard(board);
    const { row, col } = selectedCell;

    const correctValue = newBoard[row][col].solution;

    newBoard[row][col].value = correctValue;
    newBoard[row][col].notes = [];

    setBoard(newBoard);
    setCluesUsed((prev) => prev + 1);
    setConflicts((prev) =>
      prev.filter((c) => !(c.row === row && c.col === col))
    );
  };

  const togglePause = () => {
    setIsTimerPaused((prev) => !prev);
    setSelectedCell(null);
  };

  return (
    <div className="min-h-screen py-15 pb-4 sm:pb-8 flex items-start justify-center">
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
        <div className="max-w-6xl w-full bg-white rounded-2xl p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-amber-600 rounded-lg grid grid-cols-2 gap-1 p-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-amber-100 rounded-sm" />
                ))}
              </div>
              <span className="text-sm font-medium text-amber-600">
                {difficulty.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Timer
                seconds={secondsElapsed}
                isPaused={isTimerPaused}
                onPause={togglePause}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sudoku Board - Left Side */}
            <div className="flex-1">
              <SudokuBoard
                board={board}
                selectedCell={selectedCell}
                conflicts={conflicts}
                onCellSelect={handleCellSelect}
                showValues={!isTimerPaused}
              />
              <div className="flex items-center justify-center gap-4 py-2">
                <div className="bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  <span className="text-amber-900 text-sm font-medium">
                    Mistakes:{" "}
                    <span className="text-amber-900">
                      {mistakes}/{totalMistakes}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {/* Controls - Right Side */}
            <div className="flex flex-col items-center lg:w-80 gap-6">
              {/* Number input pad */}
              <div className="grid grid-cols-5 gap-2 w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberInput(num)}
                    className="aspect-square bg-amber-50 rounded-lg hover:bg-amber-100 shadow-md
                            transition-colors font-medium text-amber-900
                            border border-amber-200 hover:border-amber-300
                            focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => handleNumberInput(0)}
                  className="col-span-1 bg-amber-50 rounded-lg hover:bg-amber-100
                        flex items-center justify-center border border-amber-200
                        hover:border-amber-300 transition-colors"
                  aria-label="Clear cell"
                >
                  <BackspaceIcon className="w-5 h-5 text-amber-600" />
                </button>
              </div>

              {/* Game Controls */}
              {/* <GameControls
                onNewGame={() => setShowConfirmation(true)}
                className="w-full"
              /> */}
              <GameControls
                onNewGame={() => setShowConfirmation(true)}
                onClue={handleClue}
                cluesLeft={totalClues - cluesUsed}
                onTogglePencil={() => setIsPencilMode(!isPencilMode)}
                isPencilMode={isPencilMode}
              />
            </div>
            {/* Add confirmation modal rendering */}
            {showConfirmation && (
              <ConfirmationModal
                onConfirm={() => {
                  window.location.reload(false);
                }}
                onCancel={() => setShowConfirmation(false)}
              />
            )}

            {gameOver && (
              <GameOverModal
                onRestart={() => {
                  setGameOver(false);
                  initializeGame(difficulty);
                }}
              />
            )}

            {gameWon && (
              <GameWonModal
                onClose={() => setGameWon(false)}
                onNewGame={() => window.location.reload(false)}
                time={secondsElapsed}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SudokuGame;
