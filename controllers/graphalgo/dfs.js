const dfs = async (req, res) => {
  const { root, num, adjList } = req.body;

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

  let stack = [];
  let steps = [];
  let visited = new Set();

  stack.unshift(root);
  visited.add(root);

  while (stack.length !== 0) {
    const stackSnapshot = [...stack];
    const current = stack.shift();

    const neighbours = Array.isArray(adjList[current])
      ? adjList[current]
      : [];

    const step = {
      stack: stackSnapshot,
      neighbours: neighbours,
      current: current,
      found: false,
    };

    if (current == num) {
      step.found = true;
      steps.push(step);
      break;
    }

    steps.push(step);

    for (let i = neighbours.length - 1; i >= 0; i--) {
      const neighbor = neighbours[i];
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.unshift(neighbor);
      }
    }
  }

  return res.status(200).json({
    message: "success",
    arr: steps,
  });
};

module.exports = { dfs };
