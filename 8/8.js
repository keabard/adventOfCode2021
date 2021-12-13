const fs = require("fs").promises;

const partOne = (input) => {
  return input.reduce(
    (acc, line) =>
      acc +
      line.outputs.reduce(
        (acc2, output) => acc2 + [2, 3, 4, 7].includes(output.length),
        0
      ),
    0
  );
};

const partTwo = (input) => {
  return input.reduce((acc, val) => {
    // 0, 1, 7, 4, 8, 9, 6
    const foundDigits = [];
    foundDigits[1] = val.digits.find((digit) => digit.length === 2);
    foundDigits[7] = val.digits.find((digit) => digit.length === 3);
    const topSegment = Array.from(foundDigits[7]).find(
      (c) => !foundDigits[1].includes(c)
    );
    foundDigits[4] = val.digits.find((digit) => digit.length === 4);
    const fiveLengthDigits = val.digits.filter((digit) => digit.length === 5); // 2, 3 or 5
    const middleSegment = Array.from(foundDigits[4]).find((c) =>
      fiveLengthDigits.every((d) => d.includes(c))
    );
    const topLeftSegment = Array.from(foundDigits[4]).find(
      (c) => !foundDigits[1].includes(c) && c !== middleSegment
    );
    const sixLengthDigits = val.digits.filter((digit) => digit.length === 6); // 0, 6 or 9
    foundDigits[0] = sixLengthDigits.find(
      (digit) => !digit.includes(middleSegment)
    );
    foundDigits[8] = val.digits.find((digit) => digit.length === 7);
    const sixOrNine = sixLengthDigits.filter((digit) =>
      digit.includes(middleSegment)
    );
    foundDigits[9] = sixOrNine.find((digit) =>
      Array.from(foundDigits[4]).every((c) => digit.includes(c))
    );
    foundDigits[6] = sixOrNine.find((digit) => digit !== foundDigits[9]);
    const topRightSegment = Array.from(foundDigits[4]).find(
      (c) => !foundDigits[6].includes(c)
    );
    foundDigits[5] = fiveLengthDigits.find(
      (digit) => !digit.includes(topRightSegment)
    );
    const bottomRightSegment = Array.from(foundDigits[1]).find(
      (c) => c !== topRightSegment
    );
    foundDigits[3] = fiveLengthDigits.find(
      (digit) =>
        digit.includes(topRightSegment) && digit.includes(bottomRightSegment)
    );
    foundDigits[2] = fiveLengthDigits.find(
      (digit) => digit !== foundDigits[3] && digit !== foundDigits[5]
    );

    const sortedFoundDigits = foundDigits.map((digit) =>
      Array.from(digit).sort().join()
    );

    const resultNumber = val.outputs
      .map((digit) => {
        const sortedDigit = Array.from(digit).sort().join();
        return sortedFoundDigits.indexOf(sortedDigit);
      })
      .join("");
    return acc + Number(resultNumber);
  }, 0);
};

fs.readFile("./8.input.txt", "utf-8").then((input) => {
  const lines = input.split("\n");
  console.log(
    partTwo(
      lines.map((line) => ({
        digits: line.split(" | ")[0].split(" "),
        outputs: line.split(" | ")[1].split(" "),
      }))
    )
  );
});
