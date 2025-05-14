import PropTypes from "prop-types";
import { FaStopwatch, FaPause, FaPlay } from "react-icons/fa6";

const Timer = ({ seconds, isPaused, onPause }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <button
      onClick={onPause}
      className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-lg
               hover:bg-stone-200 transition-colors group focus:outline-none
               focus:ring-2 focus:ring-stone-400"
    >
      <FaStopwatch className="text-stone-600" />
      <span className="text-sm font-medium text-stone-600">
        <span className="flex items-center gap-1">
          {isPaused ? (
            <FaPlay className="text-xs" />
          ) : (
            <FaPause className="text-xs" />
          )}
          {formatTime(seconds)}
        </span>
      </span>
    </button>
  );
};

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  isPaused: PropTypes.bool.isRequired,
  onPause: PropTypes.func.isRequired,
};

export default Timer;
