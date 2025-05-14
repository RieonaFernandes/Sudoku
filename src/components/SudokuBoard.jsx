import SudokuCell from "./SudokuCell";

const SudokuBoard = ({
  board,
  selectedCell,
  onCellSelect,
  conflicts,
  showValues,
}) => {
  // Function to determine if a cell is in a conflict state
  const hasConflict = (row, col) => {
    return conflicts.some((coord) => coord.row === row && coord.col === col);
  };

  return (
    <div className="max-w-lg w-full mx-auto bg-amber-50 p-2 rounded-xl">
      <div className="grid grid-cols-9 gap-0 bg-amber-200">
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            const isSelected =
              selectedCell?.row === rowIdx && selectedCell?.col === colIdx;
            const isConflict = hasConflict(rowIdx, colIdx);

            return (
              <SudokuCell
                key={`${rowIdx}-${colIdx}`}
                value={cell.value}
                isFixed={cell.isFixed}
                isSelected={isSelected}
                isConflict={isConflict}
                onClick={() => !cell.isFixed && onCellSelect(rowIdx, colIdx)}
                row={rowIdx}
                col={colIdx}
                showValue={showValues}
                notes={cell.notes || []}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;
