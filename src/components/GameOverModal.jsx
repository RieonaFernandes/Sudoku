import PropTypes from "prop-types";
import gameOver from "../../public/gameOver.gif";

const GameOverModal = ({ onRestart }) => {
  return (
    <div className="fixed inset-0 bg-stone-900/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      {/* <div className="bg-stone-50 rounded-2xl p-8 max-w-md w-full shadow-waffle-active animate-pop-in"> */}
      <div
        className="text-center relative overflow-hidden space-y-2 xs:space-y-3 sm:space-y-4 bg-amber-50 p-1.5 
      xs:p-2 sm:p-4 md:p-5 lg:p-6 rounded-3xl border-2 border-amber-300 shadow-[0_5px_15px_rgba(251,191,36,0.3)] 
      max-w-md w-full shadow-waffle-active animate-pop-in"
      >
        <div className="text-center mb-8">
          <div className="py-4 flex flex-col items-center justify-center">
            <img
              src={gameOver}
              alt="gameOver"
              className="w-30 sm:w-32 md:w-34 lg:w-36 h-24 sm:h-26 md:h-28 lg:h-30"
              loading="eager"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-amber-800 Agbalumo-bold ">
            Oops! Burnt the batter.
          </h2>
          <p className="mb-6 text-amber-600 Agbalumo-regular text-[10px] xs:text-[15px] sm:text-sm">
            The grid couldn't take the heat. Let's try a fresh mix.
          </p>
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-yellow-500 text-stone-50 rounded-lg Agbalumo-regular 
                     hover:from-amber-600 hover:to-amber-700 transition-colors shadow-md
                     border border-2 border-amber-300 focus:ring-2 focus:ring-amber-300
                     bg-gradient-to-r from-amber-500 to-amber-600"
          >
            Take Another Crack at It
          </button>
        </div>
      </div>
    </div>
  );
};

GameOverModal.propTypes = {
  onRestart: PropTypes.func.isRequired,
};

export default GameOverModal;
