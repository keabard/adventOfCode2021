const fs = require("fs").promises;

const partOne = (input) => {
  const maxNumber = Math.max(...input);
  const minNumber = Math.min(...input);
  return Math.min(
    ...Array.from({ length: maxNumber - minNumber + 1 }, (_, i) => i).map(
      (position) => {
        return input.reduce((acc, val) => acc + Math.abs(val - position), 0);
      }
    )
  );
};

const partTwo = (input) => {
  const maxNumber = Math.max(...input);
  const minNumber = Math.min(...input);
  return Math.min(
    ...Array.from({ length: maxNumber - minNumber + 1 }, (_, i) => i).map(
      (position) =>
        input.reduce((acc, val) => {
          const diff = Math.abs(val - position);
          return acc + ((1 + diff) * diff) / 2;
        }, 0)
    )
  );
};

fs.readFile("./7.input.txt", "utf-8").then((input) => {
  const formattedInput = input.split(",").map(Number);
  console.log(partTwo(formattedInput));
});
