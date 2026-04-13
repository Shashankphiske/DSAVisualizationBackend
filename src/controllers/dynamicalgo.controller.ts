import { Request, Response } from "express";
import { DynamicAlgoService } from "../services/dynamicalgo.service";
import { logger } from "../logger/logger";

const service = new DynamicAlgoService();

export class DynamicAlgoController {
  fibonacci(req: Request, res: Response): void {

    logger.http("Generate Fibonacci algo steps request received", {
      ip: req.ip
    });

    try {
      const { n } = req.body;
      const result = service.fibonacci(n);
      res.status(200).json({ message: "success", ...result });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid input";
      res.status(400).json({ message, steps: [] });
    }
  }

  coinChange(req: Request, res: Response): void {
    logger.http("Generate CoinChange algo steps request received", {
      ip: req.ip
    });

    try {
      const { coins, amount } = req.body;
      const result = service.coinChange(coins, amount);
      res.status(200).json({ message: "success", ...result });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid input";
      res.status(400).json({ message, steps: [] });
    }
  }

  lcs(req: Request, res: Response): void {
    logger.http("Generate Longest Common Subsequence algo steps request received", {
      ip: req.ip
    });

    try {
      const { s1, s2 } = req.body;
      const result = service.lcs(s1, s2);
      res.status(200).json({ message: "success", ...result });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid input";
      res.status(400).json({ message, steps: [] });
    }
  }
}
