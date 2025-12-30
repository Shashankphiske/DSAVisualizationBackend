const coinChange = (req, res) => {
  const { coins, amount } = req.body;

  // Validation
  if (
    !Array.isArray(coins) ||
    typeof amount !== "number" ||
    amount < 0
  ) {
    return res.status(400).json({
      message: "Invalid input",
      steps: [],
    });
  }

  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  let steps = [];

  // Initial state
  steps.push({
    currentAmount: 0,
    coin: null,
    dpSnapshot: [...dp],
    explanation: "Initialize dp[0] = 0, others = ∞",
  });

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0 && dp[i - coin] !== Infinity) {
        const candidate = dp[i - coin] + 1;

        if (candidate < dp[i]) {
          dp[i] = candidate;

          steps.push({
            currentAmount: i,
            coin,
            from: i - coin,
            dpSnapshot: [...dp],
            explanation: `dp[${i}] = min(dp[${i}], dp[${i - coin}] + 1) = ${dp[i]}`,
          });
        }
      }
    }

    // Push step even if no coin improved it (important for animation)
    steps.push({
      currentAmount: i,
      coin: null,
      dpSnapshot: [...dp],
      explanation:
        dp[i] === Infinity
          ? `Amount ${i} cannot be formed yet`
          : `Minimum coins to form ${i} is ${dp[i]}`,
    });
  }

  return res.status(200).json({
    message: "success",
    steps,
    result: dp[amount] === Infinity ? -1 : dp[amount],
  });
};

module.exports = { coinChange };
