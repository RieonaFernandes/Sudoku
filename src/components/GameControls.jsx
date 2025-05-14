import PropTypes from "prop-types";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuPencilLine, LuPencilOff } from "react-icons/lu";

// const GameControls = ({ onNewGame, onCheckSolution }) => {
const GameControls = ({
  onNewGame,
  onClue,
  cluesLeft,
  onTogglePencil,
  isPencilMode,
}) => {
  return (
    <>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={onClue}
          disabled={cluesLeft === 0}
          className={`px-2 py-3 rounded-lg transition-colors flex flex-col gap-1 border border-amber-500 shadow-md focus:ring-2 focus:ring-amber-500 ${
            cluesLeft > 0
              ? "bg-yellow-500 text-stone-50 hover:bg-yellow-500/60"
              : "bg-yellow-500/50 text-stone-50 cursor-not-allowed"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-amber-600 ">
              <HiOutlineLightBulb className="text-2xl" />
            </span>
            <div
              className={`${
                cluesLeft === 0 ? "hidden" : "bg-amber-600"
              } h-8 w-8 rounded-lg grid grid-cols-2 gap-1 p-1`}
            >
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`${
                    i < cluesLeft ? "bg-amber-100" : "bg-amber-600"
                  } rounded-sm`}
                />
              ))}
            </div>
          </div>
        </button>

        <button
          onClick={onTogglePencil}
          className={`px-4 py-2 rounded-lg transition-colors hover:bg-yellow-500/60 border border-amber-500 shadow-md focus:ring-2 focus:ring-amber-500 ${
            isPencilMode
              ? "bg-yellow-500/60 text-stone-50 "
              : "bg-yellow-500 text-stone-50"
          }`}
        >
          {isPencilMode ? (
            <LuPencilOff className="inline-block mr-2 text-2xl" />
          ) : (
            <LuPencilLine className="inline-block mr-2 text-2xl" />
          )}
        </button>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={onNewGame}
          className="px-4 py-2 bg-yellow-500 text-stone-50 rounded-lg shadow-md hover:bg-yellow-500/60 transition-colors border border-amber-500 focus:ring-2 focus:ring-amber-500 "
        >
          Cook a Fresh Waffle
        </button>
      </div>
    </>
  );
};

GameControls.propTypes = {
  onNewGame: PropTypes.func.isRequired,
  onClue: PropTypes.func.isRequired,
  cluesLeft: PropTypes.number.isRequired,
};

export default GameControls;
