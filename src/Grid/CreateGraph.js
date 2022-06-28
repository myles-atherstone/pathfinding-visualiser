function createGraph(m, n, walls) {
  const noOfVertices = m * n;
  let adjacencyList = new Map();

  const addEdge = (v, w) => {
    //get the list for vertex v and push the
    //vertex w denoting edge between v and w
    if (!adjacencyList.get(v).includes(w)) {
      adjacencyList.get(v).push(w);
    }
  };

  //add vertices to graph
  for (let i = 0; i < noOfVertices; i++) {
    adjacencyList.set(i, []);
  }

  //add edges to graph
  for (let i = 0; i < adjacencyList.size; i++) {
    //vertices top row
    if (i < m) {
      //top left vertex
      if (i % m === 0) {
        addEdge(i, i + 1);
        addEdge(i, i + m);
      }
      //top right vertex
      else if ((i + 1) % m === 0) {
        addEdge(i, i - 1);
        addEdge(i, i + m);
      }
      //top middle vertices
      else {
        addEdge(i, i + 1);
        addEdge(i, i - 1);
        addEdge(i, i + m);
      }
    }
    //vertices bottom row
    else if (i >= m * (n - 1)) {
      //bottom left vertex
      if (i % m === 0) {
        addEdge(i, i + 1);
        addEdge(i, i - m);
      }
      //bottom right vertex
      else if ((i + 1) % m === 0) {
        addEdge(i, i - 1);
        addEdge(i, i - m);
      }
      //bottom middle vertices
      else {
        addEdge(i, i + 1);
        addEdge(i, i - 1);
        addEdge(i, i - m);
      }
    }
    //middle rows vertices
    else {
      //left edge
      if (i % m === 0) {
        addEdge(i, i + 1);
        addEdge(i, i + m);
        addEdge(i, i - m);
      }
      //right edge
      else if ((i + 1) % m === 0) {
        addEdge(i, i - 1);
        addEdge(i, i + m);
        addEdge(i, i - m);
      }
      //middle
      else {
        addEdge(i, i + 1);
        addEdge(i, i - 1);
        addEdge(i, i + m);
        addEdge(i, i - m);
      }
    }
  }

  adjacencyList = removeWalls(adjacencyList, walls);
  return adjacencyList;
}

function removeWalls(adjList, walls) {
  const adjacencyList = new Map(adjList);

  for (let i = 0; i < adjacencyList.size; i++) {
    for (let j = 0; j < walls.length; j++) {
      const index = walls[j];

      if (adjacencyList.get(i).includes(index)) {
        const ind = adjacencyList.get(i).indexOf(index);
        adjacencyList.get(i).splice(ind, 1);
      }
      if (i === index) {
        adjacencyList.set(i, []);
      }
    }
  }
  return adjacencyList;
}

export default createGraph;
