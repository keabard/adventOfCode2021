const fs = require("fs").promises;

const checkVictory = (grids) => {
  let victoriousGrids = [];
  grids.forEach((grid, gridIndex) => {
    grid.forEach((row, index) => {
      if (row.reduce((acc, val) => acc + val, 0) === -5)
        victoriousGrids.push(gridIndex);
      if (grid.reduce((acc, val) => acc + val[index], 0) === -5)
        victoriousGrids.push(gridIndex);
    });
  });
  return victoriousGrids;
};

const partOne = (input) => {
  let grids = [...input.grids];
  let score = undefined;
  for (let number of input.numbers) {
    grids = grids.map((grid) => {
      return grid.map((row) => {
        return row.map((col) => (col === number ? -1 : col));
      });
    });
    const result = checkVictory(grids);
    if (result.length > 0) {
      score =
        grids[result[0]].reduce((rowAcc, rowVal) => {
          const totalRow = rowVal.reduce(
            (colAcc, colVal) => (colVal !== -1 ? colAcc + colVal : colAcc),
            0
          );
          return totalRow !== -5 ? rowAcc + totalRow : rowAcc;
        }, 0) * number;
      break;
    }
  }
  return score;
};

const partTwo = (input) => {
  const winningGridsIndexes = [];
  let grids = [...input.grids];
  let score = undefined;
  for (let number of input.numbers) {
    grids = grids.map((grid) => {
      return grid.map((row) => {
        return row.map((col) => (col === number ? -1 : col));
      });
    });
    checkVictory(grids).forEach(
      (gridIndex) =>
        !winningGridsIndexes.includes(gridIndex) &&
        winningGridsIndexes.push(gridIndex)
    );
    if (winningGridsIndexes.length === grids.length) {
      const lastWinningGridIndex = winningGridsIndexes[grids.length - 1];
      score =
        grids[lastWinningGridIndex].reduce((rowAcc, rowVal) => {
          const totalRow = rowVal.reduce(
            (colAcc, colVal) => (colVal !== -1 ? colAcc + colVal : colAcc),
            0
          );
          return totalRow !== -5 ? rowAcc + totalRow : rowAcc;
        }, 0) * number;
      break;
    }
  }
  return score;
};

fs.readFile("./4.input.txt", "utf-8").then((input) => {
  const [numbers, ...grids] = input.split("\n\n");
  const gameInput = {
    numbers: numbers.split(",").map(Number),
    grids: grids.map((grid) =>
      grid.split("\n").map((row) => {
        return row.split(" ").filter(Boolean).map(Number);
      })
    ),
  };
  console.log(partTwo(gameInput));
});
