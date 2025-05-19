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
      className="flex items-center gap-2 px-3 py-1.5 bg-amber-200 rounded-lg 
               hover:bg-amber-200/60 transition-colors group focus:outline-none
               focus:ring-2 focus:ring-amber-500 shadow-md border border-amber-500 cursor-pointer"
    >
      <FaStopwatch className="text-amber-700" />
      <span className="text-sm font-medium text-amber-700">
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
