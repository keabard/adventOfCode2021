const fs = require("fs").promises;

const foldUp = (coords, foldLineIndex) => {
  const newCoords = [];
  coords.forEach((coord) => {
    let newPoint;
    if (coord[1] > foldLineIndex) {
      newPoint = [coord[0], coord[1] - (coord[1] - foldLineIndex) * 2];
    } else if (coord[1] !== foldLineIndex) {
      newPoint = [...coord];
    }
    if (
      newPoint[1] >= 0 &&
      newCoords.every(
        (newCoord) =>
          !(newCoord[0] === newPoint[0] && newCoord[1] === newPoint[1])
      )
    ) {
      newCoords.push(newPoint);
    }
  });
  return newCoords;
};

const foldLeft = (coords, foldLineIndex) => {
  const newCoords = [];
  coords.forEach((coord) => {
    let newPoint;
    if (coord[0] > foldLineIndex) {
      newPoint = [coord[0] - (coord[0] - foldLineIndex) * 2, coord[1]];
    } else if (coord[0] !== foldLineIndex) {
      newPoint = [...coord];
    }
    if (
      newPoint[0] >= 0 &&
      newCoords.every(
        (newCoord) =>
          !(newCoord[0] === newPoint[0] && newCoord[1] === newPoint[1])
      )
    ) {
      newCoords.push(newPoint);
    }
  });
  return newCoords;
};

const FOLD_FUNCTION_FOR_COORD = {
  x: foldLeft,
  y: foldUp,
};

const partOne = ({ coords, folds }) => {
  let newCoords = [...coords];
  folds.slice(0, 1).forEach(({ key, value }) => {
    newCoords = FOLD_FUNCTION_FOR_COORD[key](newCoords, value);
  });
  return newCoords.length;
};

const partTwo = ({ coords, folds }) => {
  let newCoords = [...coords];
  folds.forEach(({ key, value }) => {
    newCoords = FOLD_FUNCTION_FOR_COORD[key](newCoords, value);
  });
  const maxX = Math.max(...newCoords.map(([x, y]) => x));
  const maxY = Math.max(...newCoords.map(([x, y]) => y));
  return Array.from({ length: maxY + 1 }, (_, yIndex) =>
    Array.from({ length: maxX + 1 }, (_, xIndex) =>
      newCoords.find(
        (newCoord) => newCoord[0] === xIndex && newCoord[1] === yIndex
      )
        ? "#"
        : "."
    ).join(" ")
  ).join("\n");
};

fs.readFile("./13.input.txt", "utf-8").then((input) => {
  const [coords, folds] = input.split("\n\n");
  const formattedInput = {
    coords: coords.split("\n").map((line) => line.split(",").map(Number)),
    folds: folds.split("\n").map((line) => {
      const cleanedLine = line.replace("fold along ", "");
      return {
        key: cleanedLine.split("=")[0],
        value: Number(cleanedLine.split("=")[1]),
      };
    }),
  };
  console.log(partTwo(formattedInput));
});
