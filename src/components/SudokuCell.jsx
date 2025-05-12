import PropTypes from "prop-types";
import { useEffect } from "react";

const SudokuCell = ({
  value,
  isFixed,
  isSelected,
  isConflict,
  onClick,
  className,
  row,
  col,
}) => {
  // Handle keyboard accessibility
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isSelected && !isFixed) {
        const number = parseInt(e.key);
        if (number >= 1 && number <= 9) {
          onClick(number);
        } else if (e.key === "Backspace" || e.key === "Delete") {
          onClick(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isSelected, isFixed, onClick]);

  return (
    <button
      className={`
        aspect-square flex items-center justify-center 
        text-xl sm:text-2xl font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-400
        ${className}
        ${
          isFixed
            ? "text-gray-800 bg-gray-50 font-bold cursor-not-allowed"
            : "text-blue-600 bg-white hover:bg-blue-50 cursor-pointer"
        }
        ${isSelected ? "!bg-blue-200" : ""}
        ${isConflict ? "!bg-red-200" : ""}
        ${(row + 1) % 3 === 0 ? "border-b-4 border-gray-300" : ""}
        ${(col + 1) % 3 === 0 ? "border-r-4 border-gray-300" : ""}
      `}
      onClick={() => !isFixed && onClick()}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}. ${
        value || "empty"
      }${isFixed ? ", fixed value" : ""}`}
      disabled={isFixed}
    >
      {value !== 0 ? value : ""}
    </button>
  );
};

SudokuCell.propTypes = {
  value: PropTypes.number.isRequired,
  isFixed: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
  isConflict: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

export default SudokuCell;
