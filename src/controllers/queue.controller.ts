import { Request, Response } from "express";
import { QueueService } from "../services/queue.service";
import { logger } from "../logger/logger";

const service = new QueueService();

export class QueueController {
  enqueue(req: Request, res: Response): void {
    logger.http("Generate Enqueue algo steps request received", {
      ip: req.ip
    });

    const { queue, enqueue } = req.body;
    const steps = service.enqueue(queue, enqueue);
    res.status(200).json({ message: "success", steps });
  }

  dequeue(req: Request, res: Response): void {
    logger.http("Generate Dequeue algo steps request received", {
      ip: req.ip
    });

    const { queue, dequeue } = req.body;
    const steps = service.dequeue(queue, dequeue);
    res.status(200).json({ message: "success", steps });
  }
}
