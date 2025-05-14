// import PropTypes from "prop-types";

// const GameWonModal = ({ onClose, onNewGame }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl animate-pop-in">
//         <div className="text-center">
//           <div className="text-6xl mb-4">🎉</div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">
//             Congratulations!
//           </h2>
//           <p className="text-gray-600 mb-6">You've solved the Sudoku puzzle!</p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={onNewGame}
//               className="px-6 py-3 bg-green-500 text-white rounded-lg
//                        hover:bg-green-600 transition-colors
//                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//             >
//               New Game
//             </button>
//             {/* <button
//               onClick={onClose}
//               className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg
//                        hover:bg-gray-300 transition-colors
//                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
//             >
//               Close
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// GameWonModal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   onNewGame: PropTypes.func.isRequired,
// };

// export default GameWonModal;

import PropTypes from "prop-types";
import { GiCelebrationFire } from "react-icons/gi";

const GameWonModal = ({ onClose, onNewGame }) => {
  return (
    <div className="fixed inset-0 bg-stone-900/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-stone-50 rounded-2xl p-8 max-w-md w-full shadow-waffle-active animate-pop-in">
        <div className="text-center">
          <div className="flex items-center justify-center text-4xl mb-4">
            <GiCelebrationFire className="text-yellow-500" />
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
