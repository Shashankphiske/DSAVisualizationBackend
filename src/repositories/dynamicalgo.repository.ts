import { CoinChangeStep, FibonacciStep, LCSStep, LCSBacktrackStep } from "../types";

export class DynamicAlgoRepository {
  fibonacci(n: number): { steps: FibonacciStep[]; result: number } {
    const dp = Array(n + 1).fill(0);
    const steps: FibonacciStep[] = [];

    if (n >= 1) dp[1] = 1;

    steps.push({ index: 0, dpSnapshot: [...dp], explanation: "Initialize dp[0] = 0" });
    if (n >= 1) steps.push({ index: 1, dpSnapshot: [...dp], explanation: "Initialize dp[1] = 1" });

    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
      steps.push({
        index: i,
        from: [i - 1, i - 2],
        dpSnapshot: [...dp],
        explanation: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i]}`,
      });
    }
    return { steps, result: dp[n] };
  }

  coinChange(coins: number[], amount: number): { steps: CoinChangeStep[]; result: number } {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0; 
    const steps = [];

    steps.push({
      currentAmount: 0,
      coin: null,
      from: null,
      dpSnapshot: [...dp],
      explanation: "Initialize dp[0] = 0, others = ∞",
    });

    for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
        if (i - coin >= 0 && dp[i - coin] !== Infinity) {
          const candidate = dp[i - coin] + 1; // Choose the smallest number of coins
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

      steps.push({
        currentAmount: i,
        coin: null,
        from: null,
        dpSnapshot: [...dp],
        explanation: dp[i] === Infinity ? `Amount ${i} cannot be formed yet` : `Minimum coins to form ${i} is ${dp[i]}`,
      });
    }

    return { steps, result: dp[amount] === Infinity ? -1 : dp[amount] };
  }

  lcs(s1: string, s2: string): { steps: LCSStep[]; backtrackSteps: LCSBacktrackStep[]; lcs: string } {
    const m = s1.length, n = s2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const steps: LCSStep[] = [];

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        let explanation = "", from: [number, number][] = [];

        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
          explanation = `Characters match (${s1[i - 1]}). Taking diagonal + 1`;
          from = [[i - 1, j - 1]];
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
          dp[i][j] = dp[i - 1][j];
          explanation = "Characters differ. Taking top value";
          from = [[i - 1, j]];
        } else {
          dp[i][j] = dp[i][j - 1];
          explanation = "Characters differ. Taking left value";
          from = [[i, j - 1]];
        }

        steps.push({ i, j, dpSnapshot: dp.map((row) => [...row]), chars: [s1[i - 1], s2[j - 1]], from, explanation });
      }
    }

    let lcsStr = "", bi = m, bj = n;
    const backtrackSteps: LCSBacktrackStep[] = [];

    while (bi > 0 && bj > 0) {
      if (s1[bi - 1] === s2[bj - 1]) {
        lcsStr = s1[bi - 1] + lcsStr;
        backtrackSteps.push({ i: bi, j: bj, action: "match", char: s1[bi - 1] });
        bi--; bj--;
      } else if (dp[bi - 1][bj] >= dp[bi][bj - 1]) {
        backtrackSteps.push({ i: bi, j: bj, action: "up" });
        bi--;
      } else {
        backtrackSteps.push({ i: bi, j: bj, action: "left" });
        bj--;
      }
    }

    return { steps, backtrackSteps, lcs: lcsStr };
  }
}
