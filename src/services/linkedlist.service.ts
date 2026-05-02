import { logger } from "../logger/logger";
import { LinkedListRepository } from "../repositories/linkedlist.repository";

const repo = new LinkedListRepository();

export class LinkedListService {
  singlyInsertion(arr: number[], index: number, value: number) {
    const steps = repo.singlyInsertion(arr, index, value);

    logger.info("LinkedList singly insertion steps generated");

    return steps;
  }

  singlyDeletion(arr: number[], index: number) {
    const steps = repo.singlyDeletion(arr, index);
    logger.info("Linkedlist singly deletion steps generated");
    return steps
  }

  singlyReversal(arr: number[]) {
    const steps = repo.singlyReversal(arr);
    logger.info("LinkedList singly reversal steps generated");
    return steps;
  }

  doublyInsertion(arr: number[], index: number, value: number) {
    const steps = repo.doublyInsertion(arr, index, value);
    logger.info("LinkedList doubly insertion steps generated");
    return steps;
  }

  doublyDeletion(arr: number[], index: number) {
    const steps = repo.doublyDeletion(arr, index);
    logger.info("LinkedList doubly deletion steps generated");
    return steps;
  }

  doublyReversal(arr: number[]) {
    const steps = repo.doublyReversal(arr);
    logger.info("LinkedList doubly reversal steps generated");
    return steps;
  }
}
