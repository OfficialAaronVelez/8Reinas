import React from "react";

const ChessBoard = ({ queens, setQueens, selectedQueen, lightColor, darkColor, invalidColor }) => {
  const rows = 8;
  const cols = 8;

  // Handle square click to place/remove a queen
  const handleSquareClick = (row, col) => {
    const pos = `${row}-${col}`;
    setQueens((prev) => {
      if (prev.includes(pos)) {
        return prev.filter((q) => q !== pos); // Remove queen
      } else {
        return [...prev, pos]; // Add queen
      }
    });
  };
  

  // Calculate invalid positions
  const calculateInvalidPositions = () => {
    const invalid = new Set();

    queens.forEach((q) => {
      const [queenRow, queenCol] = q.split("-").map(Number);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (
            i === queenRow || // Same row
            j === queenCol || // Same column
            Math.abs(queenRow - i) === Math.abs(queenCol - j) // Diagonals
          ) {
            invalid.add(`${i}-${j}`);
          }
        }
      }
    });

    return invalid;
  };

  const invalidPositions = calculateInvalidPositions();

  const board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const pos = `${i}-${j}`;
      const isQueen = queens.includes(pos);
      const isInvalid = invalidPositions.has(pos);
      const isBlack = (i + j) % 2 === 1;

      row.push(
        <div
          key={pos}
          className={`w-16 h-16 flex items-center justify-center cursor-pointer ${
            isInvalid && !isQueen ? "cursor-not-allowed" : ""
          }`}
          style={{
            backgroundColor: isInvalid
              ? invalidColor // User-selected invalid color
              : isBlack
              ? darkColor // Custom dark color
              : lightColor, // Custom light color
          }}
          onClick={() => (isQueen ? handleSquareClick(i, j) : !isInvalid && handleSquareClick(i, j))}
          >
          {isQueen && <img src={`/${selectedQueen}`} alt="Queen" className="w-12 h-12" />}
        </div>
      );
    }
    board.push(
      <div key={i} className="flex">
        {row}
      </div>
    );
  }

  return <div className="inline-block border-2 border-black">{board}</div>;
};

export default ChessBoard;