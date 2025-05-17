import PropTypes from "prop-types";
import newGame from "../../public/newGame.gif";

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-stone-900/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      {/* <div className="bg-stone-50 rounded-2xl p-8 max-w-md w-full shadow-waffle-active animate-pop-in"> */}
      <div className="text-center relative overflow-hidden space-y-2 xs:space-y-3 sm:space-y-4 bg-amber-50 p-1.5 xs:p-2 sm:p-4 md:p-5 lg:p-6 rounded-3xl border-2 border-amber-300 shadow-[0_5px_15px_rgba(251,191,36,0.3)] max-w-md w-full shadow-waffle-active animate-pop-in">
        <div className="absolute top-0 right-0 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 bg-amber-100 rounded-bl-[100%]"></div>
        <div className="absolute -bottom-2 sm:-bottom-4 left-0 w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 bg-amber-100 rounded-tr-[100%]"></div>

        <div className="text-center">
          <div className="flex flex-col items-center justify-center mb-4 text-xl">
            <img
              src={newGame}
              alt="newGame"
              className="w-30 sm:w-32 md:w-34 lg:w-36 h-24 sm:h-26 md:h-28 lg:h-30"
              loading="eager"
            />
          </div>
          <h3 className="text-xl font-semibold text-amber-800 mb-3 Agbalumo-regular">
            Start a new waffle?
          </h3>
          <p className="mb-6 text-amber-700 Agbalumo-regular">
            Your current stack will be flipped out.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onConfirm}
              className="px-5 py-2 bg-yellow-500 text-stone-50 rounded-lg shadow-md
                       hover:from-amber-600 hover:to-amber-700 transition-colors Agbalumo-regular
                       border border-2 border-amber-300 focus:ring-2 focus:ring-amber-300
                       bg-gradient-to-r from-amber-500 to-amber-600"
            >
              Yup, Flip It
            </button>
            <button
              onClick={onCancel}
              className="px-5 py-2 bg-yellow-500 text-stone-50 rounded-lg Agbalumo-regular
              hover:from-amber-600 hover:to-amber-700 transition-colors shadow-md
              border border-2 border-amber-300 focus:ring-2 focus:ring-amber-300
              bg-gradient-to-r from-amber-500 to-amber-600"
            >
              Wait, I'm Still Cooking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
