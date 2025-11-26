const astaralgo = async (req, res) => {
  let adj = req.body.adj;
  const start = req.body.start;
  const end = req.body.end;
  const heuristic = req.body.heuristic || {};

  if (typeof adj === "string") {
    adj = JSON.parse(adj);
  }

  if (typeof heuristic === "string") {
    heuristic = JSON.parse(heuristic);
  }

  let steps = [];
  const gScore = {};
  const fScore = {};
  const visited = new Set();
  const previous = {};
  const pq = []; 

  for (let node of Object.keys(adj)) {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
  }

  gScore[start] = 0;
  fScore[start] = heuristic[start] || 0;
  pq.push({ node: start, f: fScore[start] });

  while (pq.length > 0) {
    pq.sort((a, b) => a.f - b.f);
    const { node } = pq.shift();

    let step = {
      priorityQ: [...pq],
      gScore: { ...gScore },
      fScore: { ...fScore },
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
      const tentativeG = gScore[node] + adj[node][neighbor];
      step.neighbors.push(neighbor);

      if (tentativeG < gScore[neighbor]) {
        previous[neighbor] = node;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] = tentativeG + (heuristic[neighbor] || 0);

        pq.push({ node: neighbor, f: fScore[neighbor] });
      }
    }

    step.gScore = { ...gScore };
    step.fScore = { ...fScore };
    step.previous = { ...previous };
    step.visited = Array.from(visited);
    steps.push(step);
  }

  return res.status(200).json({
    message: "success",
    arr: steps,
  });
};

module.exports = { astaralgo };
