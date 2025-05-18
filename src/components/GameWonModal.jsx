import PropTypes from "prop-types";
import gameWon from "../../public/gameWon.gif";
import confetti from "canvas-confetti";
import { Trophy } from "lucide-react";

const GameWonModal = ({ onClose, onNewGame, time }) => {
  confetti({
    particleCount: 300,
    spread: 130,
    origin: { y: 0.6 },
    colors: ["#FFD700", "#FFA500", "#FF8C00", "#FF6347"],
  });

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

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

        <div className="text-center mb-2 flex flex-col items-center justify-center">
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
          <div className="text-amber-800 grid grid-cols-2 gap-1 Agbalumo-regular bg-amber-300 p-1 rounded-4xl border-2 border-amber-400">
            <div className="h-8 w-8 xs:h-8 xs:w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 bg-amber-500 rounded-full flex items-center justify-center animate-pulse shadow-inner">
              <Trophy className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-amber-100" />
            </div>
            <p className="mt-2">{formatTime(time)}</p>
          </div>

          <p className="mb-6 text-amber-600 Agbalumo-regular">
            Every square in place, this batch is baked to perfection.
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={onNewGame}
              className="px-6 py-3 bg-yellow-500 text-stone-50 rounded-2xl shadow-md
                       hover:from-amber-600 hover:to-amber-700 transition-colors font-medium Agbalumo-regular
                       w-full border border-2 border-amber-300 focus:ring-2 focus:ring-amber-300
                     bg-gradient-to-r from-amber-500 to-amber-600"
            >
              Mix a New Batch
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-yellow-500 text-stone-50 rounded-2xl Agbalumo-regular 
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
