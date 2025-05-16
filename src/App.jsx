import SudokuGame from "./components/SudokuGame";
import title from "../public/title.png";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 home-background">
      <div className="py-4 flex flex-col items-center justify-center">
        <img
          src={title}
          alt="title"
          className="w-30 sm:w-32 md:w-34 lg:w-36 h-26 sm:h-30 md:h-32 lg:h-34"
        />
      </div>
      <main className="mx-auto">
        <div className="flex flex-col items-center justify-center">
          <SudokuGame />
        </div>
      </main>

      <footer className="mt-auto py-4 bg-yellow-600/60 border-t border-yellow-300">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-stone-50">
            © {new Date().getFullYear()} Sudoku Game
          </p>
          <p className="text-center text-sm text-stone-50">
            Designed by & Coded by Rieona Fernandes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
