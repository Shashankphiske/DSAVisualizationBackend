const dijkstrasalgo = async (req, res) => {
  let { adj, start, end } = req.body;

  if (!adj || !start || !end) {
    return res.status(400).json({
      message: "Invalid input",
      arr: [],
    });
  }

  if (typeof adj === "string") {
    adj = JSON.parse(adj);
  }

  if (!adj[start] || !adj[end]) {
    return res.status(400).json({
      message: "Start or end node not found",
      arr: [],
    });
  }

  let steps = [];
  const distances = {};
  const visited = new Set();
  const previous = {};
  const pq = [];

  // Initialize distances
  for (let node of Object.keys(adj)) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  pq.push({ node: start, distance: 0 });

  while (pq.length > 0) {
    // Priority queue behavior
    pq.sort((a, b) => a.distance - b.distance);
    const { node: currentNode, distance } = pq.shift();

    // Skip stale entries
    if (visited.has(currentNode)) continue;

    visited.add(currentNode);

    let step = {
      priorityQ: [...pq],
      currentNode,
      neighbors: [],
      distances: { ...distances },
      previous: { ...previous },
      visited: Array.from(visited),
      found: false,
    };

    // 🎯 Target reached
    if (currentNode === end) {
      step.found = true;
      steps.push(step);
      break;
    }

    // Relax edges
    for (let neighbor in adj[currentNode]) {
      const weight = adj[currentNode][neighbor];
      const newDist = distances[currentNode] + weight;

      step.neighbors.push(neighbor);

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = currentNode;
        pq.push({ node: neighbor, distance: newDist });
      }
    }

    // Update step AFTER relaxation
    step.distances = { ...distances };
    step.previous = { ...previous };
    step.priorityQ = [...pq];
    step.visited = Array.from(visited);

    steps.push(step);
  }

  return res.status(200).json({
    message: "success",
    arr: steps,
  });
};

module.exports = { dijkstrasalgo };
