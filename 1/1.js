const TEST_INPUT = require("./1.input.test");
const INPUT = require("./1.input");

const partOne = (input) => {
  let increaseCount = 0;
  for (let depthIndex = 0; depthIndex < input.length; depthIndex++) {
    if (input[depthIndex + 1] - input[depthIndex] > 0) increaseCount++;
  }
  return increaseCount;
};

const partTwo = (input) => {
  let increaseCount = 0;
  for (let depthIndex = 1; depthIndex <= input.length - 2; depthIndex++) {
    const firstWindow =
      input[depthIndex - 1] + input[depthIndex] + input[depthIndex + 1];
    const secondWindow =
      input[depthIndex] + input[depthIndex + 1] + input[depthIndex + 2];
    if (secondWindow - firstWindow > 0) increaseCount++;
  }
  return increaseCount;
};

console.log(partOne(INPUT));
console.log(partTwo(INPUT));
