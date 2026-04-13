import { logger } from "../logger/logger";
import { QueueRepository } from "../repositories/queue.repository";

const repo = new QueueRepository();

export class QueueService {
  enqueue(queue: number[], toEnqueue: number[]) {
    const steps = repo.enqueue(queue, toEnqueue);

    logger.info("Queue enqueue steps generated", {
      itemsAdded: toEnqueue.length
    });

    return steps;
  }

  dequeue(queue: number[], dequeueList: number[]) {
    const steps = repo.dequeue(queue, dequeueList);

    logger.info("Queue dequeue steps generated", {
      itemsRemoved: dequeueList.length
    });

    return steps;
  }
}
