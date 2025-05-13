import { useState } from "react";
import PropTypes from "prop-types";
import DifficultySelector from "./DifficultySelector";

const StartModal = ({ onStart }) => {
  const [difficulty, setDifficulty] = useState("medium");

  const handleStart = () => {
    onStart(difficulty);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl animate-pop-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sudoku</h2>
          <span className="text-sm font-medium text-gray-700">Mode</span>

          <div className="mb-8">
            <DifficultySelector
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              className="items-center"
            />
          </div>

          <button
            onClick={() => handleStart(difficulty)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg
                     hover:bg-green-600 transition-colors text-lg font-medium
                     w-full"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

StartModal.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartModal;
