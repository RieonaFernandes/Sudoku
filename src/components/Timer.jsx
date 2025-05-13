import PropTypes from "prop-types";
import { FaStopwatch } from "react-icons/fa6";

const Timer = ({ seconds }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center text-md font-medium text-gray-700 gap-2">
      <FaStopwatch /> {formatTime(seconds)}
    </div>
  );
};

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
};

export default Timer;
