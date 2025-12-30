const fibonacci = (req, res) => {
  const { n } = req.body;

  if (typeof n !== "number" || n < 0 || n > 50) {
    return res.status(400).json({
      message: "Invalid input",
      steps: [],
    });
  }

  let dp = Array(n + 1).fill(0);
  let steps = [];

  if (n >= 1) dp[1] = 1;

  // Initial states
  steps.push({
    index: 0,
    dpSnapshot: [...dp],
    explanation: "Initialize dp[0] = 0",
  });

  if (n >= 1) {
    steps.push({
      index: 1,
      dpSnapshot: [...dp],
      explanation: "Initialize dp[1] = 1",
    });
  }

  // Build DP
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];

    steps.push({
      index: i,
      from: [i - 1, i - 2],
      dpSnapshot: [...dp],
      explanation: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i]}`,
    });
  }

  return res.status(200).json({
    message: "success",
    steps,
    result: dp[n],
  });
};

module.exports = { fibonacci };
