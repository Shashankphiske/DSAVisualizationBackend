class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/* ================= POSTORDER HELPER ================= */
const postorderHelper = (node, steps) => {
  if (!node) return;

  postorderHelper(node.left, steps);   // Left
  postorderHelper(node.right, steps);  // Right
  steps.push(node.val);                // Root
};

/* ================= POSTORDER CONTROLLER ================= */
const postorder = (req, res) => {
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

  // Build nodes & tree edges
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

  // 🔑 Detect root (node never appearing as child)
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

  // Postorder traversal
  let steps = [];
  postorderHelper(root, steps);

  return res.status(200).json({
    message: "success",
    arr: steps,
  });
};

module.exports = { postorder };
