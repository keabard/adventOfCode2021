const TEST_INPUT = require("./2.input.test");
const INPUT = require("./2.input");

const partOne = (input) => {
  let depth = 0;
  let horizontal = 0;
  input.forEach((command) => {
    const [commandType, commandNumber] = command.split(" ");
    switch (commandType) {
      case "forward":
        horizontal += Number(commandNumber);
        break;
      case "up":
        depth -= Number(commandNumber);
        break;
      case "down":
        depth += Number(commandNumber);
        break;
    }
  });
  return depth * horizontal;
};

const partTwo = (input) => {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;
  input.forEach((command) => {
    const [commandType, commandNumber] = command.split(" ");
    switch (commandType) {
      case "forward":
        horizontal += Number(commandNumber);
        depth += Number(commandNumber) * aim;
        break;
      case "up":
        aim -= Number(commandNumber);
        break;
      case "down":
        aim += Number(commandNumber);
        break;
    }
  });
  return depth * horizontal;
};

console.log(partTwo(INPUT));
