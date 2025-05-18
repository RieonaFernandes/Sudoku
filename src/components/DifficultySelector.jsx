import PropTypes from "prop-types";
import { Trophy, ChevronUp } from "lucide-react";
import easyLevel from "../../public/easy.png";
import medLevel from "../../public/medium.png";
import hardLevel from "../../public/hard.png";
import exptLevel from "../../public/expert.png";

const DifficultySelector = ({ difficulty, setDifficulty, className }) => {
  const difficulties = [
    {
      id: "easy",
      name: "easy",
      label: "Fluffy",
      description: "Light & airy. For beginners!",
      border: "border-amber-300",
      imageSrc: easyLevel,
      imageAlt: "Fluffy waffle",
    },
    {
      id: "medium",
      name: "medium",
      label: "Golden",
      description: "Balanced. Medium challenge.",
      border: "border-amber-400",
      imageSrc: medLevel,
      imageAlt: "Golden waffle",
    },
    {
      id: "hard",
      name: "hard",
      label: "Crispy",
      description: "Crunchy! For experts.",
      border: "border-amber-500",
      imageSrc: hardLevel,
      imageAlt: "Crispy waffle",
    },
    {
      id: "expert",
      name: "expert",
      label: "Belgian",
      description: "Ultimate waffle challenge!",
      border: "border-amber-600",
      imageSrc: exptLevel,
      imageAlt: "Belgian waffle",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 p-3 m-[15px] sm:m-[1px]">
      {difficulties.map((diff) => (
        <button
          key={diff.name}
          onClick={() => setDifficulty(diff.name)}
          className={`group flex flex-col items-center transition-all duration-300 relative
          ${difficulty === diff.name ? "scale-105" : "hover:scale-102"}`}
        >
          {/* Main content */}
          <div
            className={`relative w-[80%] md:w-full aspect-square rounded-[4px] xs:rounded-md sm:rounded-lg md:rounded-xl overflow-hidden p-3 sm:p-1

          ${difficulty === diff.name ? "ring-2 ring-amber-500" : ""} 
          transition-all duration-300 group-hover:shadow-lg`}
          >
            {/* Image */}
            <img
              src={diff.imageSrc}
              alt={diff.imageAlt}
              className={`object-cover  ${
                difficulty === diff.name ? " animate-slower-bounce " : ""
              }`}
              loading="eager"
            />

            {/* Selection indicator */}
            {difficulty === diff.name && (
              <div className="absolute bottom-0.5 right-0.5 xs:bottom-1 xs:right-1 h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-amber-500 rounded-full flex items-center justify-center animate-pulse shadow-inner">
                <Trophy className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white" />
              </div>
            )}
          </div>

          {/* Difficulty name */}
          <p
            className={`mt-0.5 xs:mt-1 text-[8px] xs:text-[10px] sm:text-sm md:text-base font-bold text-amber-800 transition-all Agbalumo-regular
          ${difficulty === diff.name ? "scale-110" : ""}`}
          >
            {diff.label}
          </p>

          {/* Description - only visible when selected */}
          <div
            className={`overflow-hidden transition-all duration-300 text-center
          ${
            difficulty === diff.name
              ? "max-h-8 xs:max-h-12 sm:max-h-16 md:max-h-20 opacity-100 mt-0.5 xs:mt-0.5 sm:mt-1"
              : "max-h-0 opacity-0 mt-0"
          }`}
          >
            <p
              className={`mt-0.5 xs:mt-1 text-[6px] xs:text-[8px] sm:text-[10px] font-bold text-amber-600 transition-all Agbalumo-regular capitalize
          ${difficulty === diff.name ? "scale-110" : ""}`}
            >
              {diff.name}
            </p>
            <p className="text-[6px] xs:text-[7px] sm:text-[10px] text-amber-600 leading-tight px-0.5 Agbalumo-regular">
              {diff.description}
            </p>
          </div>

          {/* Show more details indicator */}
          {difficulty === diff.name && (
            <ChevronUp className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-amber-500 animate-bounce mt-0.5 xs:mt-0.5 sm:mt-1" />
          )}
        </button>
      ))}
    </div>
  );
};

DifficultySelector.propTypes = {
  difficulty: PropTypes.string.isRequired,
  setDifficulty: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DifficultySelector;
