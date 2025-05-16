import PropTypes from "prop-types";
import gameWon from "../../public/gameWon.gif";

const GameWonModal = ({ onClose, onNewGame }) => {
  return (
    <div className="fixed inset-0 bg-stone-900/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-stone-50 rounded-2xl p-8 max-w-md w-full shadow-waffle-active animate-pop-in">
        <div className="text-center">
          <div className="py-4 flex flex-col items-center justify-center">
            <img
              src={gameWon}
              alt="gameWon"
              className="w-30 sm:w-32 md:w-34 lg:w-36 h-24 sm:h-26 md:h-28 lg:h-30"
            />
          </div>
          <h2 className="text-2xl font-semibold text-stone-800 mb-4">
            Waffle Master!
          </h2>
          <p className="text-stone-600 mb-6">
            Every square in place, this batch is baked to perfection.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={onNewGame}
              className="px-6 py-3 bg-yellow-500 text-stone-700 rounded-lg 
                       hover:bg-yellow-500/60 transition-colors font-medium
                       w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              Mix a New Batch
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-yellow-500 text-stone-700 rounded-lg 
                       hover:bg-yellow-500/60 transition-colors font-medium
                       w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
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
