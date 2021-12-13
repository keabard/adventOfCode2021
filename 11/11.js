const fs = require("fs").promises;

const isFlashable = (grid) =>
  grid.some((line) => line.some((octopus) => octopus > 9));

const isSync = (grid) =>
  grid.every((line) => line.every((octopus) => octopus === 0));

const partOne = (input) => {
  const grid = [...input];
  let step = 0;
  let flashNumber = 0;
  while (step < 100) {
    const flashedPositions = [];
    grid.forEach((line, rowIndex) => {
      line.forEach((octopus, colIndex) => {
        grid[rowIndex][colIndex] = grid[rowIndex][colIndex] + 1;
      });
    });
    while (isFlashable(grid)) {
      grid.forEach((line, rowIndex) => {
        line.forEach((octopus, colIndex) => {
          if (octopus > 9) {
            flashedPositions.push({ row: rowIndex, col: colIndex });
            grid[rowIndex][colIndex] = 0;
            flashNumber += 1;
            [
              [-1, -1],
              [-1, 0],
              [-1, 1],
              [0, -1],
              [0, 1],
              [1, -1],
              [1, 0],
              [1, 1],
            ].forEach(([rowMod, colMod]) => {
              if (
                grid[rowIndex + rowMod]?.[colIndex + colMod] &&
                flashedPositions.every(
                  (flashedPosition) =>
                    !(
                      flashedPosition.row === rowIndex + rowMod &&
                      flashedPosition.col === colIndex + colMod
                    )
                )
              ) {
                grid[rowIndex + rowMod][colIndex + colMod] += 1;
              }
            });
          }
        });
      });
    }
    // console.log(grid.map((line) => line.join("")).join("\n"), "\n");
    step += 1;
  }
  return flashNumber;
};

const partTwo = (input) => {
  const grid = [...input];
  let step = 0;
  let flashNumber = 0;
  while (!isSync(grid)) {
    const flashedPositions = [];
    grid.forEach((line, rowIndex) => {
      line.forEach((octopus, colIndex) => {
        grid[rowIndex][colIndex] = grid[rowIndex][colIndex] + 1;
      });
    });
    while (isFlashable(grid)) {
      grid.forEach((line, rowIndex) => {
        line.forEach((octopus, colIndex) => {
          if (octopus > 9) {
            flashedPositions.push({ row: rowIndex, col: colIndex });
            grid[rowIndex][colIndex] = 0;
            flashNumber += 1;
            [
              [-1, -1],
              [-1, 0],
              [-1, 1],
              [0, -1],
              [0, 1],
              [1, -1],
              [1, 0],
              [1, 1],
            ].forEach(([rowMod, colMod]) => {
              if (
                grid[rowIndex + rowMod]?.[colIndex + colMod] &&
                flashedPositions.every(
                  (flashedPosition) =>
                    !(
                      flashedPosition.row === rowIndex + rowMod &&
                      flashedPosition.col === colIndex + colMod
                    )
                )
              ) {
                grid[rowIndex + rowMod][colIndex + colMod] += 1;
              }
            });
          }
        });
      });
    }
    // console.log(grid.map((line) => line.join("")).join("\n"), "\n");
    step += 1;
  }
  return step;
};

fs.readFile("./11.input.txt", "utf-8").then((input) => {
  const formattedInput = input
    .split("\n")
    .map((line) => line.split("").map(Number));
  console.log(partTwo(formattedInput));
});
