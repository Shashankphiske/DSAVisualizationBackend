const dijkstrasalgo = async (req, res) => {
  let adj = req.body.adj;
  const start = req.body.start;
  const end = req.body.end;
  
  if (typeof adj === "string") {
    adj = JSON.parse(adj);
  }

  let steps = [];
  const distances = {};
  const visited = new Set();
  const previous = {};
  const pq = [];

  for (let node of Object.keys(adj)) {
    distances[node] = Infinity;
  }

  distances[start] = 0;
  pq.push({ node: start, distance: 0 });

  while (pq.length > 0) {
    pq.sort((a, b) => a.distance - b.distance);
    const { node } = pq.shift();

    let step = {
      priorityQ: [...pq],
      distances: { ...distances },
      previous: { ...previous },
      currentNode: node,
      neighbors: [],
      visited: Array.from(visited),
      found: false,
    };

    if (visited.has(node)) {
      steps.push(step);
      continue;
    }

    visited.add(node);

    if (node === end) {
      step.found = true;
      steps.push(step);
      break;
    }

    for (let neighbor in adj[node]) {
      const ndist = distances[node] + adj[node][neighbor];
      step.neighbors.push(neighbor);
      if (ndist < distances[neighbor]) {
        distances[neighbor] = ndist;
        previous[neighbor] = node;
        pq.push({ node: neighbor, distance: ndist });
      }
    }

    step.distances = { ...distances };
    step.previous = { ...previous };
    step.visited = Array.from(visited);
    steps.push(step);
  }

  return res.status(200).json({
    message: "success",
    arr: steps,
  });
};

module.exports = { dijkstrasalgo };
