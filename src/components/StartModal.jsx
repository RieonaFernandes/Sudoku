import { useState } from "react";
import PropTypes from "prop-types";
import DifficultySelector from "./DifficultySelector";
import title from "../../public/hello.gif";

const StartModal = ({ onStart }) => {
  const [difficulty, setDifficulty] = useState(null);

  return (
    <div className="fixed inset-0 bg-stone-900/30 flex items-center justify-center p-4 z-50 backdrop-blur-md">
      <div className="space-y-2 xs:space-y-3 sm:space-y-4 bg-amber-50 p-6 rounded-3xl border-2 border-amber-300 shadow-[0_5px_15px_rgba(251,191,36,0.3)] relative overflow-hidden shadow-waffle-active animate-pop-in">
        <div className="text-center relative overflow-hidden space-y-2 xs:space-y-3 sm:space-y-4 bg-amber-50 p-1.5 xs:p-2 sm:p-4 md:p-5 lg:p-6 rounded-3xl border-2 border-amber-300 shadow-[0_5px_15px_rgba(251,191,36,0.3)] max-w-md w-full">
          <div className="absolute top-0 right-0 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 bg-amber-100 rounded-bl-[100%]"></div>
          <div className="absolute -bottom-2 sm:-bottom-4 left-0 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 bg-amber-100 rounded-tr-[100%]"></div>

          <div className=" flex flex-col items-center justify-center">
            <img
              src={title}
              alt="title"
              className="w-30 sm:w-32 md:w-34 lg:w-36 h-26 sm:h-28 md:h-30 lg:h-32"
              loading="eager"
            />
          </div>
          <div className="text-center mb-1 sm:mb-3 md:mb-4">
            <h1 className="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl unkempt-bold text-amber-800 mb-0.5 sm:mb-1 tracking-wide Agbalumo-bold">
              Sudoku
            </h1>
            <div className="w-16 xs:w-20 sm:w-32 md:w-40 lg:w-48 h-0.5 sm:h-1.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full mx-auto"></div>
            <p className="text-[8px] xs:text-[10px] sm:text-sm md:text-base lg:text-lg text-amber-700 font-medium mt-0.5 xs:mt-1 sm:mt-2 Agbalumo-regular">
              Choose your waffle style!
            </p>
          </div>
          <div>
            <DifficultySelector
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              className="justify-center"
            />
          </div>

          <button
            onClick={() => onStart(difficulty)}
            disabled={!difficulty}
            className={`w-full py-2 sm:py-2.5 md:py-3 lg:py-4 text-[10px] sm:text-sm md:text-base lg:text-lg font-bold text-white
              bg-gradient-to-r from-amber-500 to-amber-600 
              rounded-[8px] sm:rounded-[15px] md:rounded-[20px] border border-2 border-amber-400 transition-all duration-300
              shadow-[0_2px_0_rgba(217,119,6,1)] sm:shadow-[0_3px_0_rgba(217,119,6,1)] md:shadow-[0_4px_0_rgba(217,119,6,1)]
              active:translate-y-[2px] xs:active:translate-y-[4px] active:shadow-none Agbalumo-regular
              ${
                !difficulty
                  ? "opacity-70"
                  : "animate-slower-bounce cursor-pointer hover:translate-y-[1px] xs:hover:translate-y-[2px] hover:from-amber-600 hover:to-amber-700 hover:shadow-[0_2px_0_rgba(217,119,6,1)]"
              }`}
          >
            {difficulty ? "START COOKING!" : "Pick a Waffle First!"}
          </button>

          <h6 className="text-[6px] xs:text-[7px] sm:text-[9px] md:text-xs text-amber-700 font-normal mt-0.5 xs:mt-1 sm:mt-2 Agbalumo-regular">
            The waffle iron is hot. Are your skills crispy?
          </h6>
        </div>
      </div>
    </div>
  );
};

StartModal.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default StartModal;
