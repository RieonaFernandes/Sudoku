import SudokuCell from "./SudokuCell";
import grid from "../../public/grid.png";

const SudokuBoard = ({
  board,
  selectedCell,
  onCellSelect,
  conflicts,
  showValues,
}) => {
  const hasConflict = (row, col) => {
    return conflicts.some((coord) => coord.row === row && coord.col === col);
  };

  return (
    <div className="relative max-w-lg w-full mx-auto p-2 sm:p-4 rounded-3xl">
      {/* <div className="relative max-w-lg w-full mx-auto p-4 bg-amber-50 rounded-3xl shadow-waffle-active"> */}
      {/* Grid Image Background */}
      <div className="relative aspect-square">
        <img
          src={grid}
          alt="sudoku grid"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Interactive Cells Overlay */}
      <div className="absolute top-[11.5%] left-[10.5%] right-[14%] bottom-[15.5%] sm:top-[12%] sm:left-[11%] sm:right-[14%] sm:bottom-[16%]">
        <div className="grid grid-cols-9 grid-rows-9 h-full w-full">
          {board.map((row, rowIdx) =>
            row.map((cell, colIdx) => {
              const isSelected =
                selectedCell?.row === rowIdx && selectedCell?.col === colIdx;
              const isConflict = hasConflict(rowIdx, colIdx);

              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className="flex items-center justify-center p-[4px] sm:p-[4px]"
                >
                  <SudokuCell
                    value={cell.value}
                    isFixed={cell.isFixed}
                    isSelected={isSelected}
                    isConflict={isConflict}
                    onClick={() =>
                      !cell.isFixed && onCellSelect(rowIdx, colIdx)
                    }
                    row={rowIdx}
                    col={colIdx}
                    showValue={showValues}
                    notes={cell.notes || []}
                    className="w-full h-full"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default SudokuBoard;
