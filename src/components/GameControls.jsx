import PropTypes from "prop-types";

// const GameControls = ({ onNewGame, onCheckSolution }) => {
const GameControls = ({ onNewGame }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
      <button
        onClick={onNewGame}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Start new game"
      >
        New Game
      </button>

      {/* <button
        onClick={onCheckSolution}
        className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label="Check current solution"
      >
        Check Solution
      </button> */}
    </div>
  );
};

GameControls.propTypes = {
  onNewGame: PropTypes.func.isRequired,
  onCheckSolution: PropTypes.func.isRequired,
};

export default GameControls;
