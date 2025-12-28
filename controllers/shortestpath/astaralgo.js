const astaralgo = async (req, res) => {
  let { adj, start, end, heuristic } = req.body;

  // 🔒 Validation
  if (!adj || !start || !end) {
    return res.status(400).json({
      message: "Invalid input",
      arr: [],
    });
  }

  if (typeof adj === "string") {
    adj = JSON.parse(adj);
  }

  if (typeof heuristic === "string") {
    heuristic = JSON.parse(heuristic);
  }

  if (!adj[start] || !adj[end]) {
    return res.status(400).json({
      message: "Start or end node not found",
      arr: [],
    });
  }

  heuristic = heuristic || {};

  let steps = [];
  const gScore = {};
  const fScore = {};
  const visited = new Set();
  const previous = {};
  const pq = [];

  // Initialize scores
  for (let node of Object.keys(adj)) {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
  }

  gScore[start] = 0;
  fScore[start] = heuristic[start] || 0;

  pq.push({ node: start, f: fScore[start] });

  while (pq.length > 0) {
    // Priority queue behavior
    pq.sort((a, b) => a.f - b.f);
    const { node: currentNode } = pq.shift();

    // Skip stale entries
    if (visited.has(currentNode)) continue;

    visited.add(currentNode);

    let step = {
      priorityQ: [...pq],
      currentNode,
      neighbors: [],
      gScore: { ...gScore },
      fScore: { ...fScore },
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
      const tentativeG = gScore[currentNode] + weight;

      step.neighbors.push(neighbor);

      if (tentativeG < gScore[neighbor]) {
        previous[neighbor] = currentNode;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] = tentativeG + (heuristic[neighbor] || 0);

        pq.push({ node: neighbor, f: fScore[neighbor] });
      }
    }

    // Update step AFTER relaxation
    step.gScore = { ...gScore };
    step.fScore = { ...fScore };
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

module.exports = { astaralgo };
