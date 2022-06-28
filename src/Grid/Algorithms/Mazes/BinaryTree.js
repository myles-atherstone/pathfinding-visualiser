function binaryTree(columns, rows) {
  const wallMap = new Map();
  const trueCells = [];
  const output = [];

  function hasNorthNeighbour(index) {
    if (index > columns * 2) {
      return true;
    }
    return false;
  }

  function hasWestNeighbour(index) {
    if (trueCells.includes(index - 2)) {
      return true;
    }
    return false;
  }

  function carveNorth(index) {
    wallMap.set(index - columns, false);
  }

  function carveWest(index) {
    wallMap.set(index - 1, false);
  }

  function isOdd(number) {
    if (number % 2 === 0) {
      return false;
    }
    return true;
  }

  // set all cells as walls
  for (let i = 0; i < columns * rows; i++) {
    wallMap.set(i, true);
  }

  // set cells on odd columns and odd rows as not walls
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (isOdd(i) && isOdd(j)) {
        wallMap.set(i * columns + j, false);
        trueCells.push(i * columns + j);
      }
    }
  }

  // algorithm
  for (let i = 0; i < trueCells.length; i++) {
    if (!hasNorthNeighbour(trueCells[i]) && hasWestNeighbour(trueCells[i])) {
      carveWest(trueCells[i]);
    } else if (
      hasNorthNeighbour(trueCells[i]) &&
      !hasWestNeighbour(trueCells[i])
    ) {
      carveNorth(trueCells[i]);
    } else if (
      hasNorthNeighbour(trueCells[i]) &&
      hasWestNeighbour(trueCells[i])
    ) {
      if (Math.floor(Math.random() * 2) === 0) {
        carveWest(trueCells[i]);
      } else {
        carveNorth(trueCells[i]);
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

  createOutput();
  return output;
}

export default binaryTree;
