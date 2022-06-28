function recursiveBacktracking(columns, rows) {
  const wallMap = new Map();
  const trueCells = [];
  const visitedCells = [];
  const stack = [];
  const output = [];

  function isOdd(number) {
    if (number % 2 === 0) {
      return false;
    }
    return true;
  }

  function setup() {
    // set all cells as walls
    for (let i = 0; i < columns * rows; i++) {
      wallMap.set(i, true);
    }
    // set cells on odd columns AND odd rows as true cells
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (isOdd(i) && isOdd(j)) {
          wallMap.set(i * columns + j, false);
          trueCells.push(i * columns + j);
          //unvisitedCells.push(i * columns + j);
        }
      }
    }
  }

  function createOutput() {
    const wallIndices = [];
    const emptyIndices = [];
    let start = -1;
    let target = -1;
    for (let i = 0; i < wallMap.size; i++) {
      if (wallMap.get(i)) {
        wallIndices.push(i);
      } else {
        emptyIndices.push(i);
      }
    }

    start = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    target = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    while (start === target) {
      target = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    output.push(wallIndices);
    output.push(start);
    output.push(target);
  }

  function shuffle(array) {
    var m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  function neighbourValid(cell, direction) {
    switch (direction) {
      case "N":
        if (visitedCells.includes(cell - columns * 2)) {
          return false;
        }
        if (!trueCells.includes(cell - columns * 2)) {
          return false;
        }
        return true;
      case "S":
        if (visitedCells.includes(cell + columns * 2)) {
          return false;
        }
        if (!trueCells.includes(cell + columns * 2)) {
          return false;
        }
        return true;
      case "E":
        if (visitedCells.includes(cell + 2)) {
          return false;
        }
        if (!trueCells.includes(cell + 2)) {
          return false;
        }
        return true;
      case "W":
        if (visitedCells.includes(cell - 2)) {
          return false;
        }
        if (!trueCells.includes(cell - 2)) {
          return false;
        }
        return true;
      default:
        console.log(
          "Error: Direction not valid! From: RecursiveBacktracking.js"
        );
    }
  }

  function carve(cell, direction) {
    switch (direction) {
      case "N":
        wallMap.set(cell - columns, false);
        return cell - columns * 2;
      case "S":
        wallMap.set(cell + columns, false);
        return cell + columns * 2;
      case "E":
        wallMap.set(cell + 1, false);
        return cell + 2;
      case "W":
        wallMap.set(cell - 1, false);
        return cell - 2;
      default:
        console.log(
          "Error: Direction not valid! From: RecursiveBacktracking.js"
        );
    }
  }

  function carvePassages() {
    let currentCell = trueCells[0];
    visitedCells.push(currentCell);
    stack.push(currentCell);

    while (stack.length > 0) {
      currentCell = stack.pop();
      var nextCell;

      const directions = shuffle(["N", "S", "E", "W"]);
      for (let i = 0; i < directions.length; i++) {
        if (neighbourValid(currentCell, directions[i])) {
          stack.push(currentCell);
          nextCell = carve(currentCell, directions[i]);
          visitedCells.push(nextCell);
          stack.push(nextCell);
          break;
        }
      }
    }
  }

  setup();
  carvePassages();
  createOutput();
  return output;
}

export default recursiveBacktracking;
