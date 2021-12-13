const fs = require("fs").promises;

const findDuplicates = (arr) =>
  arr.filter((item, index) => arr.indexOf(item) != index);

const has2SmallCaves = (path) =>
  findDuplicates(path.filter((bit) => bit.toLowerCase() === bit)).length > 0;

const partOne = (input) => {
  const navigate = (paths, map) => {
    const endPaths = paths.filter((path) => path.slice(-1)[0] === "end");
    let newPaths = [];
    paths
      .filter((path) => path.slice(-1)[0] !== "end")
      .forEach((path) => {
        const lastNode = path.slice(-1)[0];
        const possibleEnds = map
          .map(({ start, end }) => {
            if (
              start === lastNode &&
              !(path.includes(end) && end.toLowerCase() === end)
            ) {
              return end;
            } else if (
              end === lastNode &&
              !(path.includes(start) && start.toLowerCase() === start)
            ) {
              return start;
            }
          })
          .filter(Boolean);
        possibleEnds.forEach((end) => {
          newPaths.push(path.concat(end));
        });
      });
    if (newPaths.every((newPath) => newPath.end === "end")) {
      return endPaths.concat(newPaths);
    } else {
      return navigate(endPaths.concat(newPaths), map);
    }
  };
  const finalPaths = navigate([["start"]], input);
  return finalPaths.length;
};

const partTwo = (input) => {
  const navigate = (paths, map) => {
    const endPaths = paths.filter((path) => path.slice(-1)[0] === "end");
    let newPaths = [];
    paths
      .filter((path) => path.slice(-1)[0] !== "end")
      .forEach((path) => {
        const lastNode = path.slice(-1)[0];
        const possibleEnds = map
          .map(({ start, end }) => {
            if (
              start === lastNode &&
              end !== "start" &&
              !(
                has2SmallCaves(path) &&
                path.includes(end) &&
                end.toLowerCase() === end
              )
            ) {
              return end;
            } else if (
              end === lastNode &&
              start !== "start" &&
              !(
                has2SmallCaves(path) &&
                path.includes(start) &&
                start.toLowerCase() === start
              )
            ) {
              return start;
            }
          })
          .filter(Boolean);
        possibleEnds.forEach((end) => {
          newPaths.push(path.concat(end));
        });
      });
    if (newPaths.every((newPath) => newPath.end === "end")) {
      return endPaths.concat(newPaths);
    } else {
      return navigate(endPaths.concat(newPaths), map);
    }
  };
  const finalPaths = navigate([["start"]], input);
  console.log(finalPaths.map((path) => path.join(",")).join("\n"));
  return finalPaths.length;
};

fs.readFile("./12.input.txt", "utf-8").then((input) => {
  const formattedInput = input
    .split("\n")
    .map((line) => ({ start: line.split("-")[0], end: line.split("-")[1] }));
  console.log(partTwo(formattedInput));
});
