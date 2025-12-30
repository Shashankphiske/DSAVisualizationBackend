const lcs = (req, res) => {
  const { s1, s2 } = req.body;

  if (typeof s1 !== "string" || typeof s2 !== "string") {
    return res.status(400).json({
      message: "Invalid input",
      steps: [],
    });
  }

  const m = s1.length;
  const n = s2.length;

  // DP table
  const dp = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  let steps = [];

  // Build DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      let explanation = "";
      let from = [];

      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
        explanation = `Characters match (${s1[i - 1]}). Taking diagonal + 1`;
        from = [[i - 1, j - 1]];
      } else {
        if (dp[i - 1][j] >= dp[i][j - 1]) {
          dp[i][j] = dp[i - 1][j];
          explanation = `Characters differ. Taking top value`;
          from = [[i - 1, j]];
        } else {
          dp[i][j] = dp[i][j - 1];
          explanation = `Characters differ. Taking left value`;
          from = [[i, j - 1]];
        }
      }

      steps.push({
        i,
        j,
        dpSnapshot: dp.map((row) => [...row]),
        chars: [s1[i - 1], s2[j - 1]],
        from,
        explanation,
      });
    }
  }

  /* ================= BACKTRACKING ================= */
  let lcsStr = "";
  let i = m,
    j = n;
  let backtrackSteps = [];

  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      lcsStr = s1[i - 1] + lcsStr;
      backtrackSteps.push({
        i,
        j,
        action: "match",
        char: s1[i - 1],
      });
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      backtrackSteps.push({ i, j, action: "up" });
      i--;
    } else {
      backtrackSteps.push({ i, j, action: "left" });
      j--;
    }
  }

  return res.status(200).json({
    message: "success",
    steps,
    backtrackSteps,
    lcs: lcsStr,
  });
};

module.exports = { lcs };
