import PropTypes from "prop-types";

const DifficultySelector = ({ difficulty, setDifficulty, className }) => {
  const difficulties = [
    {
      id: "easy",
      label: "Easy",
      // emoji: "🌸",
      colorClasses: {
        selected: "bg-yellow-500 text-stone-50 ring-2 ring-stone-200",
        unselected: "text-yellow-500 hover:bg-yellow-500/80",
      },
    },
    {
      id: "medium",
      label: "Medium",
      // emoji: "🌾",
      colorClasses: {
        selected: "bg-yellow-500 text-stone-50 ring-2 ring-stone-200",
        unselected: "text-yellow-500 hover:bg-yellow-500/80",
      },
    },
    {
      id: "hard",
      label: "Hard",
      // emoji: "🔥",
      colorClasses: {
        selected: "bg-yellow-500 text-stone-50 ring-2 ring-stone-200",
        unselected: "text-stone-500 hover:bg-yellow-500/80",
      },
    },
  ];

  return (
    <div className={`flex gap-2 ${className}`}>
      {difficulties.map(({ id, label, emoji, colorClasses }) => (
        <div key={id} className="relative">
          <button
            // key={id}
            onClick={() => setDifficulty(id)}
            className={`
              px-4 py-2.5 rounded-xl transition-all duration-300
              flex items-center justify-center
              ${
                difficulty === id
                  ? colorClasses.selected
                  : `${colorClasses.unselected} bg-stone-50`
              }
              hover:scale-[1.02] active:scale-95
              focus:outline-none focus:ring-2 focus:ring-stone-400
              border border-stone-200/50
              ${difficulty === id ? "shadow-sm" : "shadow-xs"}
            `}
          >
            {/* <span className="text-lg mr-2 opacity-80">{emoji}</span> */}
            <span
              className={`font-medium ${
                difficulty === id ? "text-stone-50" : "text-stone-700"
              }`}
            >
              {label}
            </span>
          </button>
        </div>
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
