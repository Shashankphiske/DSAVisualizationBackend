import { Request, Response } from "express";
import { QueueService } from "../services/queue.service";
import { logger } from "../logger/logger";

const service = new QueueService();

export class QueueController {

  enqueue(req: Request, res: Response): void {
    try {
      logger.http("POST /queuealgo/enqueue", { ip: req.ip });
      const { queue, enqueue } = req.body;
      const steps = service.enqueue(queue, enqueue);
      res.status(200).json({ message: "success", steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input", steps: [] });
    }
  }

  dequeue(req: Request, res: Response): void {
    try {
      logger.http("POST /queuealgo/dequeue", { ip: req.ip });
      const { queue, dequeue } = req.body;
      const steps = service.dequeue(queue, dequeue);
      res.status(200).json({ message: "success", steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input", steps: [] });
    }
  }
}
