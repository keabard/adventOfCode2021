const fs = require("fs").promises;

const getGridPoints = (input, condition) => {
  const points = [];
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    for (let colIndex = 0; colIndex < input[rowIndex].length; colIndex++) {
      if (condition(rowIndex, colIndex)) {
        points.push({
          row: rowIndex,
          col: colIndex,
          val: input[rowIndex][colIndex],
        });
      }
    }
  }
  return points;
};

const partOne = (input) => {
  const lowPoints = getGridPoints(
    input,
    (rowIndex, colIndex) =>
      input[rowIndex][colIndex] <
        (input[rowIndex - 1]?.[colIndex] ?? Infinity) &&
      input[rowIndex][colIndex] <
        (input[rowIndex + 1]?.[colIndex] ?? Infinity) &&
      input[rowIndex][colIndex] <
        (input[rowIndex]?.[colIndex - 1] ?? Infinity) &&
      input[rowIndex][colIndex] < (input[rowIndex]?.[colIndex + 1] ?? Infinity)
  );
  return lowPoints.reduce((acc, val) => acc + val.val + 1, 0);
};

const partTwo = (input) => {
  const lowPoints = getGridPoints(
    input,
    (rowIndex, colIndex) =>
      input[rowIndex][colIndex] <
        (input[rowIndex - 1]?.[colIndex] ?? Infinity) &&
      input[rowIndex][colIndex] <
        (input[rowIndex + 1]?.[colIndex] ?? Infinity) &&
      input[rowIndex][colIndex] <
        (input[rowIndex]?.[colIndex - 1] ?? Infinity) &&
      input[rowIndex][colIndex] < (input[rowIndex]?.[colIndex + 1] ?? Infinity)
  );

  const basins = [];

  lowPoints.forEach(({ row, col, val }) => {
    let basin = [{ row, col, val }];
    let oldBasinSize = 0;
    while (basin.length > oldBasinSize) {
      oldBasinSize = basin.length;
      basin.forEach((valuePoint) => {
        const newPoints = getGridPoints(
          input,
          (rowIndex, colIndex) =>
            input[rowIndex][colIndex] !== 9 &&
            basin.every(
              (basinPoint) =>
                !(basinPoint.row === rowIndex && basinPoint.col === colIndex)
            ) &&
            ((rowIndex === valuePoint.row && colIndex === valuePoint.col - 1) ||
              (rowIndex === valuePoint.row &&
                colIndex === valuePoint.col + 1) ||
              (rowIndex === valuePoint.row - 1 &&
                colIndex === valuePoint.col) ||
              (rowIndex === valuePoint.row + 1 && colIndex === valuePoint.col))
        );
        basin = basin.concat(newPoints);
      });
    }
    basins.push(basin.length);
  });
  basins.sort((a, b) => (a < b ? -1 : 1));
  basins.reverse();
  return basins[0] * basins[1] * basins[2];
};

fs.readFile("./9.input.txt", "utf-8").then((input) => {
  const formattedInput = input
    .split("\n")
    .map((line) => line.split("").map(Number));
  console.log(partTwo(formattedInput));
});
