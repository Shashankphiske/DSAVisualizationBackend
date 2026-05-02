import { logger } from "../logger/logger";
import { QueueRepository } from "../repositories/queue.repository";

const repo = new QueueRepository();

export class QueueService {

  enqueue(queue: number[], toEnqueue: number[]) {
    if (!Array.isArray(queue) || !Array.isArray(toEnqueue)) {
      logger.warn("Queue enqueue rejected: invalid input types");
      throw new Error("Invalid input: queue and enqueue values must be arrays");
    }
    logger.info("Queue enqueue: generating steps", { count: toEnqueue.length });
    return repo.enqueue(queue, toEnqueue);
  }

  dequeue(queue: number[], count: number) {
    if (!Array.isArray(queue) || typeof count !== "number" || count < 1) {
      logger.warn("Queue dequeue rejected: invalid input");
      throw new Error("Invalid input: queue must be an array and count a positive number");
    }
    logger.info("Queue dequeue: generating steps", { count });
    return repo.dequeue(queue, count);
  }
}
