// Currently uncompleted
function ellers(columns, rows) {
  const wallMap = new Map();
  const cells = [];
  const sets = new Set();
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

  function joinAdjacentCells(set) {
    for (let cell of set.values()) {
      console.log(cell);
    }
  }

  function generate() {
    const rowLength = Math.floor(columns / 2);
    for (let i = 0; i < rowLength; i++) {
      const set = new Set([cells[i]]);
      sets.add(set);
    }

    for (let set of sets) {
      for (let cell of set.values()) {
        console.log(cell);
      }
    }

    //console.log(sets);
  }

  setup();
  generate();
  createOutput();
  return output;
}

export default ellers;
