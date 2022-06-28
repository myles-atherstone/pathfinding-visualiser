function prims(columns, rows) {
  const wallMap = new Map();
  const cells = [];
  const inMaze = [];
  const frontier = [];
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
          cells.push(i * columns + j);
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

  function getNeighbours(cell) {
    const neighbours = [];
    if (cells.includes(cell - columns * 2)) {
      neighbours.push([cell - columns * 2, "N"]);
    }
    if (cells.includes(cell + columns * 2)) {
      neighbours.push([cell + columns * 2, "S"]);
    }
    if (cells.includes(cell + 2)) {
      neighbours.push([cell + 2, "E"]);
    }
    if (cells.includes(cell - 2)) {
      neighbours.push([cell - 2, "W"]);
    }
    return neighbours;
  }

  function addToMaze(cell) {
    inMaze.push(cell);
    const neighbours = getNeighbours(cell);
    for (let i = 0; i < neighbours.length; i++) {
      if (
        !frontier.includes(neighbours[i][0]) &&
        !inMaze.includes(neighbours[i][0])
      ) {
        frontier.push(neighbours[i][0]);
      }
    }
  }

  function getNeighboursInMaze(cell) {
    const neighboursInMaze = [];
    const neighbours = getNeighbours(cell);

    for (let i = 0; i < neighbours.length; i++) {
      if (inMaze.includes(neighbours[i][0])) {
        neighboursInMaze.push(neighbours[i]);
      }
    }
    return neighboursInMaze;
  }

  function carve(cell, direction) {
    switch (direction) {
      case "N":
        wallMap.set(cell - columns, false);
        break;
      case "S":
        wallMap.set(cell + columns, false);
        break;
      case "E":
        wallMap.set(cell + 1, false);
        break;
      case "W":
        wallMap.set(cell - 1, false);
        break;
      default:
        console.log("Error: Direction not valid! From: Prims.js");
    }
  }

  function generate() {
    const startCell = cells[Math.floor(Math.random() * cells.length)];
    addToMaze(startCell);
    while (frontier.length > 0) {
      const frontierCell =
        frontier[Math.floor(Math.random() * frontier.length)];
      frontier.splice(frontier.indexOf(frontierCell), 1);
      const neighboursInMaze = getNeighboursInMaze(frontierCell);
      const neighbourCell =
        neighboursInMaze[Math.floor(Math.random() * neighboursInMaze.length)];
      carve(frontierCell, neighbourCell[1]);
      addToMaze(frontierCell);
    }
  }

  setup();
  generate();
  createOutput();
  return output;
}

export default prims;
