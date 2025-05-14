import PropTypes from "prop-types";

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-stone-900/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-stone-50 rounded-2xl p-8 max-w-md w-full shadow-waffle-active animate-pop-in">
        <div className="text-center">
          <div className="mb-4 text-2xl">🧇</div>
          <h3 className="text-xl font-semibold text-stone-800 mb-3">
            Start New Game?
          </h3>
          <p className="text-stone-600 mb-6">
            Your current progress will be lost.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onConfirm}
              className="px-5 py-2 bg-yellow-500 text-stone-50 rounded-lg 
                       hover:bg-yellow-500/60 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              Confirm
            </button>
            <button
              onClick={onCancel}
              className="px-5 py-2 bg-yellow-500 text-stone-50 rounded-lg 
                       hover:bg-yellow-500/60  transition-colors
                       focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              Cancel
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
