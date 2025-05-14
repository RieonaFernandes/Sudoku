import { useState } from "react";
import PropTypes from "prop-types";
import DifficultySelector from "./DifficultySelector";
import title from "../../public/title.png";

const StartModal = ({ onStart }) => {
  const [difficulty, setDifficulty] = useState("medium");

  return (
    <div className="fixed inset-0 bg-stone-900/30 flex items-center justify-center p-4 z-50 backdrop-blur-md">
      <div className="bg-stone-50 rounded-3xl p-8 max-w-md w-full shadow-waffle-active animate-pop-in">
        <div className="text-center">
          <div className="py-4 flex flex-col items-center justify-center">
            <img
              src={title}
              alt="title"
              className="w-30 sm:w-32 md:w-34 lg:w-36 h-20 sm:h-22 md:h-24 lg:h-26"
            />
          </div>

          {/* <h2 className="text-2xl font-semibold text-stone-800 mb-2">
            Waffle Grid
          </h2>
          <p className="text-stone-500 text-sm mb-6">Number Puzzle Game</p> */}

          <div className="mb-8 space-y-4">
            <p className="text-stone-600 text-sm font-medium">
              Difficulty Level
            </p>
            <DifficultySelector
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              className="justify-center"
            />
          </div>

          <button
            onClick={() => onStart(difficulty)}
            className="w-full py-3.5 bg-yellow-500 text-stone-50 rounded-xl
                     hover:bg-yellow-500/60 active:scale-95 transition-all
                     focus:outline-none focus:ring-2 focus:ring-stone-500
                     font-medium tracking-wide"
          >
            Start Baking 🧇
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
