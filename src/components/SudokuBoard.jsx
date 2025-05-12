import SudokuCell from "./SudokuCell";

const SudokuBoard = ({ board, selectedCell, onCellSelect, conflicts }) => {
  // Function to determine if a cell is in a conflict state
  const hasConflict = (row, col) => {
    return conflicts.some((coord) => coord.row === row && coord.col === col);
  };

  // Function to add thicker borders for 3x3 blocks
  const getBorderClass = (rowIdx, colIdx) => {
    let classes = "";
    // Add bottom border for 3rd and 6th rows
    if (rowIdx === 2 || rowIdx === 5) classes += " border-b-4 border-gray-300 ";
    // Add right border for 3rd and 6th columns
    if (colIdx === 2 || colIdx === 5) classes += " border-r-4 border-gray-300 ";
    return classes;
  };

  return (
    <div className="max-w-lg w-full mx-auto bg-gray-200 p-1 rounded-lg shadow-lg">
      <div className="grid grid-cols-9 gap-px bg-gray-300">
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
                className={getBorderClass(rowIdx, colIdx)}
                row={rowIdx}
                col={colIdx}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;
