import React, { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import { generateSolutions } from "./utils/solutions";

const App = () => {
  const [queens, setQueens] = useState([]);
  const [solutions] = useState(generateSolutions());
  const [currentSolution, setCurrentSolution] = useState(null);
  const [selectedQueen, setSelectedQueen] = useState("queen1.png");
  const [lightColor, setLightColor] = useState("#ffffff"); // Default light color
  const [darkColor, setDarkColor] = useState("#000000"); // Default dark color
  const [invalidColor, setInvalidColor] = useState("#ff0000"); // Default invalid square color

  // Show the next solution
  const showSolution = () => {
    const nextIndex = currentSolution === null ? 0 : (currentSolution + 1) % 8;
    const solution = solutions[nextIndex].map((col, row) => `${row}-${col}`);
    setQueens(solution);
    setCurrentSolution(nextIndex);
  };

  // Clear the board to allow user interaction
  const clearBoard = () => {
    setQueens([]);
    setCurrentSolution(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">8 Queens Problem</h1>

      {/* Queen Image Selector */}
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="queenImage"
            value="queen1.png"
            checked={selectedQueen === "queen1.png"}
            onChange={(e) => setSelectedQueen(e.target.value)}
          />
          <img src="/queen1.png" alt="Queen 1" className="w-10 h-10" />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="queenImage"
            value="queen2.png"
            checked={selectedQueen === "queen2.png"}
            onChange={(e) => setSelectedQueen(e.target.value)}
          />
          <img src="/queen2.png" alt="Queen 2" className="w-10 h-10" />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="queenImage"
            value="queen3.png"
            checked={selectedQueen === "queen3.png"}
            onChange={(e) => setSelectedQueen(e.target.value)}
          />
          <img src="/queen3.png" alt="Queen 3" className="w-10 h-10" />
        </label>
      </div>

      {/* Board Color Pickers */}
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Light Color:</label>
          <input
            type="color"
            value={lightColor}
            onChange={(e) => setLightColor(e.target.value)}
            className="w-10 h-10 cursor-pointer"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Dark Color:</label>
          <input
            type="color"
            value={darkColor}
            onChange={(e) => setDarkColor(e.target.value)}
            className="w-10 h-10 cursor-pointer"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Invalid Color:</label>
          <input
            type="color"
            value={invalidColor}
            onChange={(e) => setInvalidColor(e.target.value)}
            className="w-10 h-10 cursor-pointer"
          />
        </div>
      </div>

      <ChessBoard
        queens={queens}
        setQueens={setQueens}
        selectedQueen={selectedQueen}
        lightColor={lightColor}
        darkColor={darkColor}
        invalidColor={invalidColor}
      />
      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={showSolution}
        >
          Show Solution
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={clearBoard}
        >
          Clear Board
        </button>
      </div>
    </div>
  );
};

export default App;