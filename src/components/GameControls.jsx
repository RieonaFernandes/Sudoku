import PropTypes from "prop-types";
import { HiOutlineLightBulb } from "react-icons/hi";

// const GameControls = ({ onNewGame, onCheckSolution }) => {
const GameControls = ({ onNewGame, onClue, cluesLeft }) => {
  return (
    // <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
    /* <button
        onClick={onNewGame}
        className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Start new game"
      >
        New Game
      </button> */

    /* <button
        onClick={onCheckSolution}
        className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label="Check current solution"
      >
        Check Solution
      </button> */

    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={onNewGame}
        className="px-4 py-2 bg-yellow-500 text-stone-50 rounded-lg shadow-md hover:bg-yellow-500/60 transition-colors"
      >
        New Game
      </button>

      <button
        onClick={onClue}
        disabled={cluesLeft === 0}
        className={`px-2 py-3 rounded-lg transition-colors flex flex-col gap-1 ${
          cluesLeft > 0
            ? "bg-yellow-500 text-stone-50 hover:bg-yellow-500/60"
            : "bg-yellow-500/50 text-stone-50 cursor-not-allowed"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-amber-600">
            <HiOutlineLightBulb className="text-2xl" />
          </span>
          <div
            className={`${
              cluesLeft === 0 ? "hidden" : "bg-amber-600"
            } h-8 w-8 rounded-lg grid grid-cols-2 gap-1 p-1`}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`${
                  i < cluesLeft ? "bg-amber-100" : "bg-amber-600"
                } rounded-sm`}
              />
            ))}
          </div>
        </div>
      </button>
    </div>
  );
};

GameControls.propTypes = {
  onNewGame: PropTypes.func.isRequired,
  onClue: PropTypes.func.isRequired,
  cluesLeft: PropTypes.number.isRequired,
};

export default GameControls;
