const fs = require("fs").promises;

const SCORE_PER_BIT = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const SCORE_PER_BIT2 = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const OPENINGS = ["(", "[", "{", "<"];
const CLOSING_PER_OPENING = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const partOne = (input) => {
  let score = 0;
  input.forEach((line) => {
    let buffer = [];
    try {
      Array.from(line).forEach((c) => {
        if (OPENINGS.includes(c)) {
          buffer.push(c);
        } else {
          if (c === CLOSING_PER_OPENING[buffer.slice(-1)]) {
            buffer = buffer.slice(0, -1);
          } else {
            score += SCORE_PER_BIT[c];
            throw Error;
          }
        }
      });
    } catch (err) {}
  });
  return score;
};

const partTwo = (input) => {
  const scores = [];
  input.forEach((line) => {
    let buffer = [];
    try {
      Array.from(line).forEach((c) => {
        if (OPENINGS.includes(c)) {
          buffer.push(c);
        } else {
          if (c === CLOSING_PER_OPENING[buffer.slice(-1)]) {
            buffer = buffer.slice(0, -1);
          } else {
            throw Error;
          }
        }
      });
      scores.push(
        buffer
          .reverse()
          .map((c) => CLOSING_PER_OPENING[c])
          .reduce((acc, val) => acc * 5 + SCORE_PER_BIT2[val], 0)
      );
    } catch (err) {}
  });
  scores.sort((a, b) => (a < b ? -1 : 1));
  return scores[Math.floor(scores.length / 2)];
};

fs.readFile("./10.input.txt", "utf-8").then((input) => {
  const formattedInput = input.split("\n");
  console.log(partTwo(formattedInput));
});
