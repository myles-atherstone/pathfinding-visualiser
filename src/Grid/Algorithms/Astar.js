function astar(adjacencyList, start, end, m) {
  const output = [];
  const open = [start];
  const closed = [];

  const cameFrom = new Map();
  const hScores = new Map();
  const gScores = new Map();
  const fScores = new Map();

  for (let i = 0; i < adjacencyList.size; i++) {
    hScores.set(i, Number.MAX_SAFE_INTEGER);
    gScores.set(i, Number.MAX_SAFE_INTEGER);
    fScores.set(i, Number.MAX_SAFE_INTEGER);
  }

  gScores.set(start, 0);
  fScores.set(start, h(start, end, m));

  while (open.length > 0) {
    const current = lowestF(fScores, open);

    if (current === end) {
      output.push(closed);
      output.push(shortestPath(cameFrom, current));
      return output;
    }

    open.splice(open.indexOf(current), 1);
    closed.push(current);

    for (let i = 0; i < adjacencyList.get(current).length; i++) {
      const neighbour = adjacencyList.get(current)[i];
      const tempG = gScores.get(current) + 1;

      if (open.includes(neighbour) && tempG < gScores.get(neighbour)) {
        open.splice(open.indexOf(neighbour), 1);
      }

      if (!open.includes(neighbour) && !closed.includes(neighbour)) {
        gScores.set(neighbour, tempG);
        open.push(neighbour);
        fScores.set(neighbour, gScores.get(neighbour) + h(neighbour, end, m));
        cameFrom.set(neighbour, current);
      }
    }
  }
  output.push(closed);
  output.push([]);
  return output;
}

function h(start, end, m) {
  const startY = Math.floor(start / m);
  const startX = start - startY * m;
  const endY = Math.floor(end / m);
  const endX = end - endY * m;
  const estimatedDistance = Math.abs(startX - endX) + Math.abs(startY - endY);
  return estimatedDistance;
}

function lowestF(fScores, open) {
  let index = -1;
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < open.length; i++) {
    if (fScores.get(open[i]) <= min) {
      min = fScores.get(open[i]);
      index = open[i];
    }
  }
  return index;
}

function shortestPath(cameFrom, current) {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    path.unshift(current);
  }
  path.pop();
  return path;
}

export default astar;
