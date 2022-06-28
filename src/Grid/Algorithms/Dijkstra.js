const shortestPath = (previous, end) => {
  let u = previous[end];
  const s = [];

  while (u != null) {
    s.unshift(u);
    u = previous[u];
  }
  return s;
};

const indexOfMin = (queue, distance) => {
  let min = distance[queue[0]];
  let minIndex = 0;

  for (let i = 1; i < queue.length; i++) {
    if (distance[queue[i]] < min) {
      min = distance[queue[i]];
      minIndex = i;
    }
  }

  if (min === Number.MAX_SAFE_INTEGER) {
    return -1;
  }
  return minIndex;
};

const dijkstra = (graph, start, end) => {
  const output = [];
  const visitedVertices = [];
  const distance = [];
  const previous = [];
  const queue = [];

  for (let i = 0; i < graph.size; i++) {
    distance.push(Number.MAX_SAFE_INTEGER);
    previous.push(null);
    queue.push(i);
  }

  distance[start] = 0;

  while (queue.length > 0) {
    const currentVertexIndex = indexOfMin(queue, distance);
    if (currentVertexIndex === -1) {
      output.push(visitedVertices);
      output.push(shortestPath(previous, end));
      return output;
    }

    const currentVertex = queue[currentVertexIndex];
    queue.splice(currentVertexIndex, 1);

    if (currentVertex === end) {
      output.push(visitedVertices);
      output.push(shortestPath(previous, end));
      return output;
    }

    visitedVertices.push(currentVertex);

    for (let i = 0; i < graph.get(currentVertex).length; i++) {
      const vertex = graph.get(currentVertex)[i];

      if (queue.includes(vertex)) {
        const temp = distance[currentVertex] + 1;
        if (temp < distance[vertex]) {
          distance[vertex] = temp;
          previous[vertex] = currentVertex;
        }
      }
    }
  }

  output.push(visitedVertices);
  output.push(shortestPath(previous, end));
  return output;
};

export default dijkstra;
