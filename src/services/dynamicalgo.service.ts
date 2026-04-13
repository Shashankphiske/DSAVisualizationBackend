import { logger } from "../logger/logger";
import { DynamicAlgoRepository } from "../repositories/dynamicalgo.repository";

const repo = new DynamicAlgoRepository();

export class DynamicAlgoService {
  fibonacci(n: number) {
    if (typeof n !== "number" || n < 0 || n > 50) {
      throw new Error("Invalid input: n must be a number between 0 and 50");
    }

    logger.info("Fibonacci algo steps generated", {
      stepCount: n
    });

    return repo.fibonacci(n);
  }

  coinChange(coins: number[], amount: number) {
    if (!Array.isArray(coins) || typeof amount !== "number" || amount < 0) {
      throw new Error("Invalid input");
    }

    logger.info("Coin change algo steps generated", {
      coins,
      amount
    });

    return repo.coinChange(coins, amount);
  }

  lcs(s1: string, s2: string) {
    if (typeof s1 !== "string" || typeof s2 !== "string") {
      throw new Error("Invalid input: s1 and s2 must be strings");
    }

    logger.info("Least common subsequence algo steps generated", {
      sequence1: s1,
      sequence2: s2
    });

    return repo.lcs(s1, s2);
  }
}
