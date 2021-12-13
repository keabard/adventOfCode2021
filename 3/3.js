const TEST_INPUT = require("./3.input.test");
const INPUT = require("./3.input");

const partOne = (input) => {
  const mostBits = Array.from(input[0]).map((_, index) => {
    return input.reduce((acc, val) => acc + Number(val[index]), 0) >=
      input.length / 2
      ? 1
      : 0;
  });
  const leastBits = mostBits.map((bit) => (bit === 0 ? 1 : 0));
  const gammaRate = parseInt(mostBits.join(""), 2);
  const epsilonRate = parseInt(leastBits.join(""), 2);
  return epsilonRate * gammaRate;
};

const partTwo = (input) => {
  const filterNumbers = (numbers, numberSelector) => {
    let filteredInput = [...numbers];
    let bitIndex = 0;
    while (filteredInput.length > 1) {
      const mostBitOnIndex = numberSelector(
        filteredInput.reduce((acc, val) => acc + Number(val[bitIndex]), 0),
        filteredInput.length
      );
      filteredInput = filteredInput.filter(
        (number) => number[bitIndex] === mostBitOnIndex.toString()
      );
      bitIndex += 1;
    }
    return filteredInput;
  };
  const mostPopularNumber = filterNumbers(input, (bitSum, numbersLength) =>
    bitSum >= numbersLength / 2 ? 1 : 0
  );
  const oxygenGeneratorRating = parseInt(mostPopularNumber.join(""), 2);

  const leastPopularNumber = filterNumbers(input, (bitSum, numbersLength) =>
    bitSum >= numbersLength / 2 ? 0 : 1
  );
  const co2ScrubberRating = parseInt(leastPopularNumber.join(""), 2);

  return oxygenGeneratorRating * co2ScrubberRating;
};

console.log(partTwo(INPUT));
