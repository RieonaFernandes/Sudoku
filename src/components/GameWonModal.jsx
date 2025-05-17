import PropTypes from "prop-types";
import gameWon from "../../public/gameWon.gif";

const GameWonModal = ({ onClose, onNewGame }) => {
  return (
    <div className="fixed inset-0 bg-stone-900/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      {/* <div className="bg-stone-50 rounded-2xl p-8 max-w-md w-full shadow-waffle-active animate-pop-in"> */}
      <div
        className="text-center relative overflow-hidden space-y-2 xs:space-y-3 sm:space-y-4 bg-amber-50 p-1.5 
      xs:p-2 sm:p-4 md:p-5 lg:p-6 rounded-3xl border-2 border-amber-300 shadow-[0_5px_15px_rgba(251,191,36,0.3)] 
      max-w-md w-full shadow-waffle-active animate-pop-in"
      >
        <div className="absolute top-0 right-0 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 bg-amber-100 rounded-bl-[100%]"></div>
        <div className="absolute -bottom-2 sm:-bottom-4 left-0 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 bg-amber-100 rounded-tr-[100%]"></div>

        <div className="text-center mb-2">
          <div className="py-4 flex flex-col items-center justify-center">
            <img
              src={gameWon}
              alt="gameWon"
              className="w-30 sm:w-32 md:w-34 lg:w-36 h-24 sm:h-26 md:h-28 lg:h-30"
              loading="eager"
            />
          </div>
          <h2 className="text-3xl mb-4 text-amber-800 Agbalumo-bold">
            Waffle Master!
          </h2>
          <p className="mb-6 text-amber-600 Agbalumo-regular">
            Every square in place, this batch is baked to perfection.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={onNewGame}
              className="px-6 py-3 bg-yellow-500 text-stone-50 rounded-lg shadow-md
                       hover:from-amber-600 hover:to-amber-700 transition-colors font-medium Agbalumo-regular
                       w-full border border-2 border-amber-300 focus:ring-2 focus:ring-amber-300
                     bg-gradient-to-r from-amber-500 to-amber-600"
            >
              Mix a New Batch
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-yellow-500 text-stone-50 rounded-lg Agbalumo-regular 
                       hover:from-amber-600 hover:to-amber-700 transition-colors font-medium shadow-md
                       w-full border border-2 border-amber-300 focus:ring-2 focus:ring-amber-300
                     bg-gradient-to-r from-amber-500 to-amber-600"
            >
              Admire Your Waffle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

GameWonModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNewGame: PropTypes.func.isRequired,
};

export default GameWonModal;
