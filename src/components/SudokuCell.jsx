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
  showValue,
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
        text-lg font-medium transition-colors
        border border-amber-200 focus:outline-none
        ${className}
        ${
          isFixed
            ? "text-amber-800 bg-amber-50 font-semibold cursor-default"
            : "text-amber-900 bg-white hover:bg-amber-100 cursor-pointer"
        }
        ${isSelected ? "bg-amber-100 shadow-inner" : ""}
        ${isConflict ? "text-red-500 bg-red-100" : ""}
        ${
          (row + 1) % 3 === 0 && row !== 8
            ? "border-b-2 border-amber-300"
            : "border-b border-amber-200"
        }
        ${
          (col + 1) % 3 === 0 && col !== 8
            ? "border-r-2 border-amber-300"
            : "border-r border-amber-200"
        }
        focus:ring-2 focus:ring-amber-400 
        ${!showValue ? "bg-stone-100 text-transparent" : ""}
      `}
      onClick={() => !isFixed && onClick()}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}. ${
        value || "empty"
      }${isFixed ? ", fixed value" : ""}`}
      disabled={isFixed || !showValue}
    >
      {/* {value !== 0 ? value : ""} */}
      {/* {showValue ? (value !== 0 ? value : "") : ""} */}
      {showValue ? (value !== 0 ? value : "") : "?"}
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
  showValue: PropTypes.bool,
};

export default SudokuCell;
