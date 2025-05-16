import { useState } from "react";
import PropTypes from "prop-types";
import DifficultySelector from "./DifficultySelector";
import title from "../../public/hello.gif";

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
              className="w-30 sm:w-32 md:w-34 lg:w-36 h-26 sm:h-28 md:h-30 lg:h-32"
            />
          </div>

          <div className="mb-8 space-y-4">
            <p className="text-stone-600 text-sm font-medium">
              Let's Get Griddling!
            </p>
            <DifficultySelector
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              className="justify-center"
            />
          </div>

          <p className="text-stone-600 mb-6">
            The waffle iron is hot. Are your skills crispy?
          </p>

          <button
            onClick={() => onStart(difficulty)}
            className="w-full py-3.5 bg-yellow-500 text-stone-50 rounded-xl
                     hover:bg-yellow-500/60 active:scale-95 transition-all
                     focus:outline-none focus:ring-2 focus:ring-stone-500
                     font-medium tracking-wide"
          >
            Pour the Grid!
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
