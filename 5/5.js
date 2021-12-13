const fs = require("fs").promises;

const partOne = (input) => {
  const diagram = [];
  input
    .filter(([edge1, edge2]) => edge1.x === edge2.x || edge1.y === edge2.y)
    .forEach(([edge1, edge2]) => {
      const startX = Math.min(edge1.x, edge2.x);
      const endX = Math.max(edge1.x, edge2.x);
      const startY = Math.min(edge1.y, edge2.y);
      const endY = Math.max(edge1.y, edge2.y);
      for (let xIndex = startX; xIndex <= endX; xIndex++) {
        for (let yIndex = startY; yIndex <= endY; yIndex++) {
          if (!Array.isArray(diagram[xIndex])) {
            diagram[xIndex] = [];
          }
          if (diagram[xIndex][yIndex] === undefined) {
            diagram[xIndex][yIndex] = 0;
          }
          diagram[xIndex][yIndex] = diagram[xIndex][yIndex] + 1;
        }
      }
    });
  return diagram.join().match(/[2-9]/g).length;
};

const partTwo = (input) => {
  const diagram = [];
  input.forEach(([edge1, edge2]) => {
    if (edge1.x === edge2.x || edge1.y === edge2.y) {
      const startX = Math.min(edge1.x, edge2.x);
      const endX = Math.max(edge1.x, edge2.x);
      const startY = Math.min(edge1.y, edge2.y);
      const endY = Math.max(edge1.y, edge2.y);
      for (let xIndex = startX; xIndex <= endX; xIndex++) {
        for (let yIndex = startY; yIndex <= endY; yIndex++) {
          if (!Array.isArray(diagram[xIndex])) {
            diagram[xIndex] = [];
          }
          if (diagram[xIndex][yIndex] === undefined) {
            diagram[xIndex][yIndex] = 0;
          }
          diagram[xIndex][yIndex] = diagram[xIndex][yIndex] + 1;
        }
      }
    } else {
      const xCrescendo = edge1.x < edge2.x;
      const yCrescendo = edge1.y < edge2.y;
      const xDiff = Math.abs(edge1.x - edge2.x);
      for (let diagIndex = 0; diagIndex <= xDiff; diagIndex++) {
        const xIndex = xCrescendo ? edge1.x + diagIndex : edge1.x - diagIndex;
        const yIndex = yCrescendo ? edge1.y + diagIndex : edge1.y - diagIndex;
        if (!Array.isArray(diagram[xIndex])) {
          diagram[xIndex] = [];
        }
        if (diagram[xIndex][yIndex] === undefined) {
          diagram[xIndex][yIndex] = 0;
        }
        diagram[xIndex][yIndex] = diagram[xIndex][yIndex] + 1;
      }
    }
  });
  return diagram.join().match(/[2-9]/g).length;
};

fs.readFile("./5.input.txt", "utf-8").then((input) => {
  const formattedInput = input.split("\n").map((line) =>
    line.split(" -> ").map((coords) => {
      const [x, y] = coords.split(",").map(Number);
      return { x, y };
    })
  );
  console.log(partTwo(formattedInput));
});
