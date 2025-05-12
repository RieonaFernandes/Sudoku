import SudokuGame from "./components/SudokuGame";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Sudoku
          </h1>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <SudokuGame />
        </div>
      </main>

      <footer className="mt-auto bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Sudoku Game.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
