import { useState, useEffect, useMemo } from "react";
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
import { CiEraser } from "react-icons/ci";
import { BsUiChecksGrid } from "react-icons/bs";

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
  const [highlightedNumbers, setHighlightedNumbers] = useState([]);
  const [highlightedAreas, setHighlightedAreas] = useState([]);
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
    setIsTimerRunning(true);
    setGameStarted(true);
    setCluesUsed(0);
    setMistakes(0);
    setGameOver(false);
  };

  // Handle cell selection
  const handleCellSelect = (row, col) => {
    // if (!board[row][col].isFixed) {
    //   setSelectedCell((prev) =>
    //     prev?.row === row && prev?.col === col ? null : { row, col }
    //   );
    // }

    if (!board[row][col].isFixed) {
      setSelectedCell((prev) => {
        const newSelected =
          prev?.row === row && prev?.col === col ? null : { row, col };

        let newHighlightedAreas = [];
        let newHighlightedNumbers = [];

        // Update highlights when selection changes
        if (newSelected) {
          // Calculate row, column, and subgrid cells
          const { row: selRow, col: selCol } = newSelected;
          const startRow = Math.floor(selRow / 3) * 3;
          const startCol = Math.floor(selCol / 3) * 3;

          // Generate all cells in row, column, and subgrid
          const rowCells = Array.from({ length: 9 }, (_, c) => ({
            row: selRow,
            col: c,
          }));
          const colCells = Array.from({ length: 9 }, (_, r) => ({
            row: r,
            col: selCol,
          }));
          const subgridCells = [];
          for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
              subgridCells.push({ row: r, col: c });
            }
          }

          // Combine and deduplicate
          const allCells = [...rowCells, ...colCells, ...subgridCells];
          const uniqueCells = Array.from(
            new Set(allCells.map(JSON.stringify)),
            (str) => JSON.parse(str)
          );
          newHighlightedAreas = uniqueCells;

          // Calculate same-value highlights
          const selectedValue = board[selRow][selCol].value;
          newHighlightedNumbers =
            selectedValue !== 0
              ? board.flatMap((r, rIdx) =>
                  r
                    .map((cell, cIdx) =>
                      cell.value === selectedValue &&
                      !(rIdx === selRow && cIdx === selCol)
                        ? { row: rIdx, col: cIdx }
                        : null
                    )
                    .filter(Boolean)
                )
              : [];
        }
        // Update highlight states
        setHighlightedAreas(newHighlightedAreas);
        setHighlightedNumbers(newHighlightedNumbers);

        return newSelected;
      });
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

    const newBoard = cloneBoard(board);
    const { row, col } = selectedCell;

    //pencil marks
    const cell = newBoard[row][col];
    const solutionValue = cell.solution;

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
    cell.value = number;
    cell.notes = [];

    // Check both validity and solution match
    const isValidPosition = isCellValid(newBoard, row, col);
    const isCorrectValue = number === solutionValue;

    if (number !== 0) {
      if (!isValidPosition || !isCorrectValue) {
        setMistakes((prev) => prev + 1);
      }

      // Update conflicts
      const newConflicts = isValidPosition
        ? conflicts.filter((c) => !(c.row === row && c.col === col))
        : [...conflicts, { row, col }];
      // Check game over after state update
      if (mistakes + 1 >= totalMistakes) {
        setGameOver(true);
        setIsTimerRunning(false);
      }
      setConflicts(newConflicts);
    } else {
      // When erasing, remove any existing conflict for this cell
      setConflicts(conflicts.filter((c) => !(c.row === row && c.col === col)));
    }

    // Check if board is complete and valid
    const isComplete = newBoard.every((r) => r.every((c) => c.value !== 0));
    setBoard(newBoard);

    if (isComplete) {
      const isFullyValid = validateSolution(newBoard);
      setGameWon(isFullyValid);
      setIsTimerRunning(!isFullyValid);
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

  //Track Correctly Placed Numbers
  const numberCounts = useMemo(() => {
    const counts = new Array(10).fill(0);
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value !== 0 && cell.value === cell.solution) {
          counts[cell.value]++;
        }
      });
    });
    return counts;
  }, [board]);

  useEffect(() => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const selectedValue = board[row][col].value;
      const highlights =
        selectedValue !== 0
          ? board.flatMap((r, rIdx) =>
              r
                .map((cell, cIdx) =>
                  cell.value === selectedValue &&
                  !(rIdx === row && cIdx === col)
                    ? { row: rIdx, col: cIdx }
                    : null
                )
                .filter(Boolean)
            )
          : [];
      setHighlightedNumbers(highlights);
    }
  }, [board, selectedCell]);

  return (
    <div className="min-h-screen px-5 sm:px-1 py-15 pb-4 sm:pb-8 flex items-start justify-center">
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
        <div className="max-w-6xl w-full rounded-2xl p-6 bg-amber-50">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-amber-600 rounded-lg grid grid-cols-2 gap-1 p-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-amber-100 rounded-sm" />
                ))}
              </div>
              <span className="text-sm font-medium text-amber-600 Agbalumo-regular capitalize">
                {difficulty}
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
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Sudoku Board - Left Side */}
            <div className="flex-1">
              <div className="px-[10%] -mb-[5%]">
                <div className="bg-amber-50 px-3 px-2 py-0.5 rounded-md border border-amber-200 inline-block">
                  <span className="text-amber-900 text-xs font-medium Agbalumo-regular">
                    Mistakes:{" "}
                    <span className="text-amber-900">
                      {mistakes}/{totalMistakes}
                    </span>
                  </span>
                </div>
              </div>

              <SudokuBoard
                board={board}
                selectedCell={selectedCell}
                conflicts={conflicts}
                onCellSelect={handleCellSelect}
                showValues={!isTimerPaused}
                highlightedNumbers={highlightedNumbers}
                highlightedAreas={highlightedAreas}
              />
            </div>
            {/* Controls - Right Side */}
            <div className="flex flex-col items-center lg:w-80 py-3 gap-6 -mt-[6%] sm:mt-[6%]">
              {/* Number input pad */}
              <div className="grid grid-cols-5 gap-2 w-[80%] lg:w-full">
                {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberInput(num)}
                    className="aspect-square bg-amber-50 rounded-lg hover:bg-amber-100 shadow-md
                            transition-colors font-medium text-amber-900
                            border border-amber-200 hover:border-amber-300
                            focus:outline-none focus:ring-2 focus:ring-amber-400 text-md sm:text-2xl"
                  >
                    {num}
                  </button>
                ))} */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberInput(num)}
                    disabled={numberCounts[num] >= 9}
                    className={`aspect-square rounded-lg shadow-md transition-colors font-medium text-amber-900 border
                              relative
                              ${
                                numberCounts[num] >= 9
                                  ? "bg-amber-50 border-amber-300 cursor-not-allowed"
                                  : "bg-amber-200 border-amber-300 hover:border-amber-300 hover:bg-amber-100 cursor-pointer"
                              }
                              focus:outline-none focus:ring-2 focus:ring-amber-400 text-md sm:text-2xl`}
                  >
                    {numberCounts[num] < 9 && num}
                    {numberCounts[num] >= 9 && (
                      <BsUiChecksGrid
                        className="absolute inset-2 w-[80%] h-[80%] text-amber-400 opacity-75 pointer-events-none"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}

                <button
                  onClick={() => {
                    handleNumberInput(0);
                    setSelectedCell(null);
                  }}
                  className="col-span-1 bg-amber-200 rounded-lg hover:bg-amber-100
                        flex items-center justify-center border border-amber-300
                        hover:border-amber-400 transition-colors cursor-pointer"
                  aria-label="Clear cell"
                >
                  <CiEraser className="w-8 h-8 text-amber-700" />
                </button>
              </div>

              {/* Game Controls */}
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
