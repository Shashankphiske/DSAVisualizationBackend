const pop = (req, res) => {
  let stack = req.body.stack;
  const popCount = req.body.pop; // ✅ number

  let steps = [];

  const addStep = (action, current, prev, next, highlight, list) => {
    steps.push({
      action,
      pointer: { current, prev, next },
      highlight,
      list: [...list],
    });
  };

  // 🔒 Validation
  if (!Array.isArray(stack) || typeof popCount !== "number") {
    return res.status(400).json({
      message: "Invalid input",
      steps: [],
    });
  }

  for (let i = 0; i < popCount; i++) {
    if (stack.length === 0) {
      addStep("pop-start", null, null, null, [], stack);
      addStep("pop-complete", null, null, null, [], stack);
      continue;
    }

    const currentTop = stack[stack.length - 1];
    const newTop = stack.length > 1 ? stack[stack.length - 2] : null;

    // 🔹 Start pop
    addStep("pop-start", currentTop, newTop, null, [currentTop], stack);

    stack.pop();

    // 🔹 Complete pop
    addStep("pop-complete", null, newTop, null, [newTop], stack);
  }

  return res.status(200).json({
    message: "success",
    steps,
  });
};

module.exports = { pop };
