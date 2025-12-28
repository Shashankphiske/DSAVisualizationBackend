const bfs = async (req, res) => {
  const { adjList, root, num } = req.body;

  if (
    !adjList ||
    typeof adjList !== "object" ||
    root === undefined ||
    num === undefined
  ) {
    return res.status(400).json({
      message: "Invalid input",
      arr: [],
    });
  }

  if (!adjList[root]) {
    return res.status(400).json({
      message: "Root node not found",
      arr: [],
    });
  }

  let queue = [];
  let steps = [];
  let visited = new Set();

  queue.push(root);
  visited.add(root);

  while (queue.length > 0) {
    const queueSnapshot = [...queue];
    const current = queue.shift();

    const neighbours = Array.isArray(adjList[current])
      ? adjList[current]
      : [];

    const step = {
      num: current,
      neighbours: neighbours,
      queue: queueSnapshot,
      found: false,
    };

    if (current == num) {
      step.found = true;
      steps.push(step);
      break;
    }

    steps.push(step);

    for (let neighbor of neighbours) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return res.status(200).json({
    message: "success",
    arr: steps,
  });
};

module.exports = { bfs };
