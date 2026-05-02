import { Request, Response } from "express";
import { StackService } from "../services/stack.service";
import { logger } from "../logger/logger";

const service = new StackService();

export class StackController {

  push(req: Request, res: Response): void {
    try {
      logger.http("POST /stackalgo/stackpush", { ip: req.ip });
      const { stack, push } = req.body;
      const steps = service.push(stack, push);
      res.status(200).json({ message: "success", steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input", steps: [] });
    }
  }

  pop(req: Request, res: Response): void {
    try {
      logger.http("POST /stackalgo/stackpop", { ip: req.ip });
      const { stack, pop } = req.body;
      const steps = service.pop(stack, pop);
      res.status(200).json({ message: "success", steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input", steps: [] });
    }
  }
}
