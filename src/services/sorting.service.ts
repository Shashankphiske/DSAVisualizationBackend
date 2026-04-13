import { logger } from "../logger/logger";
import { SortingRepository } from "../repositories/sorting.repository";

const repo = new SortingRepository();

export class SortingService {
  private parseAndLog(raw: string, algo: string) {
    try {
      const arr: number[] = JSON.parse(raw);
      if (!Array.isArray(arr)) throw new Error("Input is not an array");
      return arr;
    } catch (error) {
      logger.warn(`${algo} failed: Invalid JSON input`, { raw });
      throw new Error("Invalid input: Expected a JSON array of numbers");
    }
  }

  bubbleSort(raw: string) {
    const arr = this.parseAndLog(raw, "BubbleSort");
    const steps = repo.bubbleSort(arr);
    logger.info("BubbleSort steps generated", { count: arr.length });
    return steps;
  }

  selectionSort(raw: string) {
    const arr = this.parseAndLog(raw, "SelectionSort");
    const steps = repo.selectionSort(arr);
    logger.info("SelectionSort steps generated", { count: arr.length });
    return steps;
  }

  insertionSort(raw: string) {
    const arr = this.parseAndLog(raw, "InsertionSort");
    const steps = repo.insertionSort(arr);
    logger.info("InsertionSort steps generated", { count: arr.length });
    return steps;
  }

  mergeSort(raw: string) {
    const arr = this.parseAndLog(raw, "MergeSort");
    const steps = repo.mergeSort(arr);
    logger.info("MergeSort steps generated", { count: arr.length });
    return steps;
  }

  quickSort(raw: string) {
    const arr = this.parseAndLog(raw, "QuickSort");
    const steps = repo.quickSort(arr);
    logger.info("QuickSort steps generated", { count: arr.length });
    return steps;
  }

  heapSort(raw: string) {
    const arr = this.parseAndLog(raw, "HeapSort");
    const steps = repo.heapSort(arr);
    logger.info("HeapSort steps generated", { count: arr.length });
    return steps;
  }
}
