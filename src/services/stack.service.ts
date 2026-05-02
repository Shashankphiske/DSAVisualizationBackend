import { logger } from "../logger/logger";
import { StackRepository } from "../repositories/stack.repository";

const repo = new StackRepository();

export class StackService {

  push(stack: number[], toPush: number[]) {
    if (!Array.isArray(stack) || !Array.isArray(toPush)) {
      logger.warn("Stack push rejected: invalid input types");
      throw new Error("Invalid input: stack and push values must be arrays");
    }
    logger.info("Stack push: generating steps", { pushCount: toPush.length });
    return repo.push(stack, toPush);
  }

  pop(stack: number[], popCount: number) {
    if (!Array.isArray(stack) || typeof popCount !== "number" || popCount < 1) {
      logger.warn("Stack pop rejected: invalid input", { popCount });
      throw new Error("Invalid input: stack must be an array and popCount a positive number");
    }
    logger.info("Stack pop: generating steps", { popCount });
    return repo.pop(stack, popCount);
  }
}
