import PropTypes from "prop-types";

const DifficultySelector = ({ difficulty, setDifficulty, className }) => {
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
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* <span className="text-sm font-medium text-gray-700">Mode</span> */}
      <div className="flex gap-2">
        {difficulties.map(({ id, label, colorClasses }) => (
          <button
            key={id}
            onClick={() => setDifficulty(id)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
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
            // aria-label={`Select ${label} difficulty`}
            // aria-pressed={difficulty === id}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

DifficultySelector.propTypes = {
  difficulty: PropTypes.string.isRequired,
  setDifficulty: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DifficultySelector;
