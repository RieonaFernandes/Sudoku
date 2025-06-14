import PropTypes from "prop-types";
import { GiWildfires } from "react-icons/gi";

const GameOverModal = ({ onRestart }) => {
  return (
    <div className="fixed inset-0 bg-stone-900/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-stone-50 rounded-2xl p-8 max-w-md w-full shadow-waffle-active animate-pop-in">
        <div className="text-center">
          <div className="flex items-center justify-center text-4xl mb-4">
            <GiWildfires className="text-orange-600" />
          </div>
          <h2 className="text-2xl font-semibold text-stone-800 mb-4">
            Oops! Burnt the batter.
          </h2>
          <p className="text-stone-600 mb-6">
            The grid couldn't take the heat. Let's try a fresh mix.
          </p>
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-yellow-500 text-stone-50 rounded-lg 
                     hover:bg-yellow-500/60 transition-colors font-medium
                     w-full focus:outline-none focus:ring-2 focus:ring-stone-400"
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
