const fs = require("fs").promises;

const partOne = (input) => {
  let workingInput = input;
  for (let day = 1; day <= 80; day++) {
    const numberOfNewFish = workingInput.match(/0/g)?.length || 0;
    workingInput = workingInput.replace(/[0]/g, "7");
    workingInput = workingInput.replace(/[1-9]/g, (bit) =>
      (+bit - 1).toString()
    );
    if (numberOfNewFish > 0) {
      workingInput = workingInput.concat(
        ",",
        Array.from({ length: numberOfNewFish }, () => "8").join(",")
      );
    }
  }
  return workingInput.replace(/,/g, "").length;
};

const partTwo = (input) => {
  let fishes = Array.from(
    { length: 9 },
    (_, i) =>
      input
        .split(",")
        .map(Number)
        .filter((bit) => bit === i).length
  );
  for (let day = 1; day <= 256; day++) {
    const numberOfNewFish = fishes[0];
    fishes[7] = fishes[7] + fishes[0];
    fishes[0] = 0;
    fishes = fishes.map((numberOfFish, index) =>
      index >= 0 && index < 8 ? fishes[index + 1] : numberOfFish
    );
    fishes[8] = numberOfNewFish;
  }
  return fishes.reduce((acc, val) => acc + val, 0);
};

fs.readFile("./6.input.txt", "utf-8").then((input) => {
  console.log(partTwo(input));
});
