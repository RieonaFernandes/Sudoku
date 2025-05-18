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
  notes = [],
  isHighlighted,
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
          text-base sm:text-lg font-medium transition-colors rounded-sm sm:rounded-lg
          ${className || ""}
          ${
            isFixed
              ? "text-orange-800 bg-amber-200/80 font-semibold cursor-default"
              : "text-orange-900 hover:bg-amber-100/60 cursor-pointer"
          }
          ${
            isSelected
              ? "ring-1 sm:ring-2 ring-amber-900 bg-amber-100/60 z-10"
              : ""
          }
          ${isConflict ? "text-red-500 bg-red-100" : ""}
          focus:ring-2 focus:ring-amber-400 
          ${!showValue ? "bg-stone-100 text-transparent" : ""}

           ${isHighlighted ? "bg-blue-50/60" : ""}

        `}
      onClick={() => !isFixed && onClick()}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}. ${
        value || "empty"
      }${isFixed ? ", fixed value" : ""}`}
      disabled={isFixed || !showValue}
    >
      {showValue ? (
        value !== 0 ? (
          <span className="text-base sm:text-lg">{value}</span>
        ) : (
          <div className="grid grid-cols-3 gap-0 w-full h-full p-[0.5px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div
                key={num}
                className="text-[6px] xs:text-[7px] sm:text-[8px] flex items-center justify-center"
              >
                {notes.includes(num) ? num : ""}
              </div>
            ))}
          </div>
        )
      ) : (
        "?"
      )}
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
  notes: PropTypes.arrayOf(PropTypes.number),
};

SudokuCell.defaultProps = {
  notes: [],
};

export default SudokuCell;
