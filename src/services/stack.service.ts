import { logger } from "../logger/logger";
import { StackRepository } from "../repositories/stack.repository";

const repo = new StackRepository();

export class StackService {
  push(stack: number[], toPush: number[]) {
    const steps = repo.push(stack, toPush);
    logger.info("Stack push steps generated", { pushCount: toPush.length });
    return steps;
  }

  pop(stack: number[], popCount: number) {
    if (!Array.isArray(stack) || typeof popCount !== "number") {
      logger.warn("Stack pop failed: Invalid input", { popCount });
      throw new Error("Invalid input");
    }

    const steps = repo.pop(stack, popCount);
    logger.info("Stack pop steps generated", { popCount });
    return steps;
  }
}
