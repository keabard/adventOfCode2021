const fs = require("fs").promises;

const partOne = (input) => {
  let template = input.template;
  let newTemplate = "";
  let step = 0;
  while (step < 10) {
    Array.from(template).forEach((c, index) => {
      if (index < template.length - 1) {
        const insertion = input.insertions.find(
          (i) => i[0] === c + template[index + 1]
        );
        newTemplate = newTemplate + c + insertion[1];
      } else {
        newTemplate = newTemplate + c;
      }
    });
    template = newTemplate;
    newTemplate = "";
    step += 1;
  }
  const counts = {};
  Array.from(template).forEach((c) => {
    if (!(c in counts)) {
      counts[c] = Array.from(template).reduce(
        (acc, val) => (val === c ? acc + 1 : acc),
        0
      );
    }
  });
  return (
    Math.max(...Object.values(counts)) - Math.min(...Object.values(counts))
  );
};

const partTwo = (input) => {
  let pairs = {};
  Array.from(input.template).forEach((c, index) => {
    if (index < input.template.length - 1) {
      const pair = c + input.template[index + 1];
      if (!(pair in pairs)) {
        pairs[pair] = 0;
      }
      pairs[pair] += 1;
    }
  });
  let step = 0;
  while (step < 40) {
    const newPairs = {};
    Object.keys(pairs).forEach((pair) => {
      const insertion = input.insertions.find(([iPair, c]) => pair === iPair);
      const firstNewPair = pair[0] + insertion[1];
      const secondNewPair = insertion[1] + pair[1];
      if (!(firstNewPair in newPairs)) {
        newPairs[firstNewPair] = 0;
      }
      if (!(secondNewPair in newPairs)) {
        newPairs[secondNewPair] = 0;
      }
      newPairs[firstNewPair] += pairs[pair];
      newPairs[secondNewPair] += pairs[pair];
    });
    step += 1;
    pairs = newPairs;
  }
  const charsWithCount = {};
  Object.entries(pairs).forEach(([pair, count]) => {
    Array.from(pair).forEach((c) => {
      if (!(c in charsWithCount)) charsWithCount[c] = 0;
      charsWithCount[c] += count;
    });
  });
  const sortedCharsWithCount = Object.entries(charsWithCount).sort(
    (pair1, pair2) => (pair1[1] < pair2[1] ? -1 : 1)
  );
  return (
    Math.round(sortedCharsWithCount.slice(-1)[0][1] / 2) -
    Math.round(sortedCharsWithCount[0][1] / 2)
  );
};

fs.readFile("./14.input.txt", "utf-8").then((input) => {
  const [template, insertions] = input.split("\n\n");
  const formattedInput = {
    template,
    insertions: insertions.split("\n").map((line) => line.split(" -> ")),
  };
  console.log(partTwo(formattedInput));
});
