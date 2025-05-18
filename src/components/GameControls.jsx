import PropTypes from "prop-types";
import { useState } from "react";
import {
  HiOutlineLightBulb,
  HiOutlineInformationCircle,
  HiX,
} from "react-icons/hi";
import { LuPencilLine, LuPencilOff } from "react-icons/lu";

const GameControls = ({
  onNewGame,
  onClue,
  cluesLeft,
  onTogglePencil,
  isPencilMode,
}) => {
  const [showClueInfo, setShowClueInfo] = useState(false);
  const [showPencilInfo, setShowPencilInfo] = useState(false);

  return (
    <>
      <div className="flex justify-center gap-4 mt-6 h-50px">
        <div className="relative inline-block">
          {/* Clue Button */}
          <button
            onClick={onClue}
            disabled={cluesLeft === 0}
            className={`relative px-2 py-3 rounded-lg transition-colors flex flex-col gap-1 border border-amber-500 shadow-md focus:ring-2 focus:ring-amber-500 ${
              cluesLeft > 0
                ? "bg-yellow-500 text-stone-50 hover:bg-yellow-500/60"
                : "bg-yellow-500/50 text-stone-50 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center p-2">
              <span className="text-sm font-medium text-amber-600">
                <HiOutlineLightBulb className="text-xl md:text-2xl" />
              </span>
            </div>

            {/* Clue Indicator */}
            {cluesLeft > 0 && (
              <div className="absolute -top-2 -right-2 bg-amber-600 h-6 w-6 rounded-md grid grid-cols-2 gap-1 p-1 shadow">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      i < cluesLeft ? "bg-amber-100" : "bg-amber-600"
                    } rounded-sm`}
                  />
                ))}
              </div>
            )}
          </button>

          {/* Info Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowClueInfo(true);
            }}
            className="absolute bottom-1 right-1 text-amber-700 hover:text-amber-600"
          >
            <HiOutlineInformationCircle className="text-sm md:text-md" />
          </button>

          {/* Info Box */}
          {showClueInfo && (
            <div className="absolute top-full mt-2 right-0 min-w-[150px] max-w-md w-fit bg-amber-100 text-amber-600 text-xs rounded-lg p-3 shadow-lg z-10 break-words">
              <div className="flex justify-between items-start gap-2  Agbalumo-regular">
                <p>
                  Click on a cell to reveal the answer. You have a total of 4
                  hints available.
                </p>
                <button
                  onClick={() => setShowClueInfo(false)}
                  className="text-amber-800 hover:text-amber-600"
                >
                  <HiX className="text-lg" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative inline-block">
          <button
            onClick={onTogglePencil}
            className={`relative px-3 py-3 rounded-lg transition-colors flex flex-col gap-1 border border-amber-500 shadow-md focus:ring-2 focus:ring-amber-500 hover:bg-yellow-500/60 ${
              isPencilMode
                ? "bg-yellow-500/60 text-stone-50 "
                : "bg-yellow-500 text-stone-50"
            }`}
          >
            <div className="flex items-center p-2">
              <span className="text-sm font-medium text-amber-600">
                {isPencilMode ? (
                  <LuPencilOff className="inline-block text-lg md:text-xl text-amber-600" />
                ) : (
                  <LuPencilLine className="inline-block text-lg md:text-xl text-amber-600" />
                )}
              </span>
            </div>

            {/* Pencil State Indicator */}
            <div className="absolute -top-2 -right-2 bg-amber-600 h-7 w-7 rounded-xl p-1 shadow">
              <p className="text-amber-100 text-xs Agbalumo-regular">
                {isPencilMode ? "ON" : "OFF"}
              </p>
            </div>
          </button>

          {/* Info Icon */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowPencilInfo(true);
            }}
            className="absolute bottom-1 right-1 text-amber-700 hover:text-amber-600"
          >
            <HiOutlineInformationCircle className="text-sm md:text-md" />
          </button>

          {/* Info Box */}
          {showPencilInfo && (
            <div className="absolute top-full mt-2 right-0 min-w-[150px] max-w-md w-fit bg-amber-100 text-amber-600 text-xs rounded-lg p-3 shadow-lg z-10 break-words">
              <div className="flex justify-between items-start gap-2  Agbalumo-regular">
                <p>Take notes.</p>
                <button
                  onClick={() => setShowPencilInfo(false)}
                  className="text-amber-800 hover:text-amber-600"
                >
                  <HiX className="text-lg" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={onNewGame}
          className="px-4 py-2 bg-yellow-500 text-stone-50 rounded-lg shadow-md hover:bg-yellow-500/60 transition-colors border 
          border-amber-500 focus:ring-2 focus:ring-amber-500 Agbalumo-regular bg-gradient-to-r from-amber-500 to-amber-600"
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
