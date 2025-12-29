class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/* ================= INORDER HELPER ================= */
const inorderHelper = (node, steps) => {
  if (!node) return;

  inorderHelper(node.left, steps);
  steps.push(node.val);
  inorderHelper(node.right, steps);
};

/* ================= INORDER CONTROLLER ================= */
const inorder = (req, res) => {
  const adj = req.body.adj;

  // 🔒 Validation
  if (!adj || typeof adj !== "object") {
    return res.status(400).json({
      message: "Invalid adjacency list",
      arr: [],
    });
  }

  const nodes = {};
  const children = new Set();

  // Create nodes
  for (let key of Object.keys(adj)) {
    if (!nodes[key]) nodes[key] = new Node(key);

    const [left, right] = adj[key] || [];

    if (left !== null && left !== "") {
      if (!nodes[left]) nodes[left] = new Node(left);
      nodes[key].left = nodes[left];
      children.add(left);
    }

    if (right !== null && right !== "") {
      if (!nodes[right]) nodes[right] = new Node(right);
      nodes[key].right = nodes[right];
      children.add(right);
    }
  }

  // 🔑 Find root (node that is never a child)
  let root = null;
  for (let key of Object.keys(nodes)) {
    if (!children.has(key)) {
      root = nodes[key];
      break;
    }
  }

  if (!root) {
    return res.status(400).json({
      message: "Invalid tree: root not found",
      arr: [],
    });
  }

  let steps = [];
  inorderHelper(root, steps);

  return res.status(200).json({
    message: "success",
    arr: steps,
  });
};

module.exports = { inorder };
