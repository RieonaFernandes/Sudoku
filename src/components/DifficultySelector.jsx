import PropTypes from "prop-types";

const DifficultySelector = ({ difficulty, setDifficulty }) => {
  const difficulties = [
    {
      id: "easy",
      label: "Easy",
      colorClasses: {
        selected: "bg-green-500 text-white ring-green-500",
        unselected: "hover:bg-green-50 text-green-700",
      },
    },
    {
      id: "medium",
      label: "Medium",
      colorClasses: {
        selected: "bg-yellow-500 text-white ring-yellow-500",
        unselected: "hover:bg-yellow-50 text-yellow-700",
      },
    },
    {
      id: "hard",
      label: "Hard",
      colorClasses: {
        selected: "bg-red-500 text-white ring-red-500",
        unselected: "hover:bg-red-50 text-red-700",
      },
    },
  ];

  return (
    <div className="flex flex-col items-center space-y-2 mb-6">
      <span className="text-sm font-medium text-gray-700 mb-2">
        Difficulty:
      </span>
      <div className="flex gap-2">
        {difficulties.map(({ id, label, colorClasses }) => (
          <button
            key={id}
            onClick={() => setDifficulty(id)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2
              border ${
                difficulty === id ? "border-transparent" : "border-gray-300"
              }
              shadow-sm
              ${
                difficulty === id
                  ? colorClasses.selected
                  : `${colorClasses.unselected} bg-white`
              }
            `}
            aria-label={`Select ${label} difficulty`}
            aria-pressed={difficulty === id}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

DifficultySelector.propTypes = {
  difficulty: PropTypes.oneOf(["easy", "medium", "hard"]).isRequired,
  setDifficulty: PropTypes.func.isRequired,
};

export default DifficultySelector;
