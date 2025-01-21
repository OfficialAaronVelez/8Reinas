export const generateSolutions = () => {
    const solutions = [];
    const board = Array(8).fill(-1);
  
    const isSafe = (row, col) => {
      for (let r = 0; r < row; r++) {
        const c = board[r];
        if (c === col || Math.abs(r - row) === Math.abs(c - col)) return false;
      }
      return true;
    };
  
    const solve = (row = 0) => {
      if (row === 8) {
        solutions.push([...board]);
        return;
      }
      for (let col = 0; col < 8; col++) {
        if (isSafe(row, col)) {
          board[row] = col;
          solve(row + 1);
          board[row] = -1;
        }
      }
    };
  
    solve();
    return solutions;
  };