import { logger } from "../logger/logger";
import { SortingRepository } from "../repositories/sorting.repository";

const repo = new SortingRepository();

/**
 * SortingService
 *
 * Validates and parses raw request input before delegating to
 * the repository. All parsing errors are logged at WARN level
 * and re-thrown so the controller can return a 400 response.
 */
export class SortingService {

  private parseArray(raw: string, caller: string): number[] {
    try {
      const arr: unknown = JSON.parse(raw);
      if (!Array.isArray(arr) || arr.some(v => typeof v !== "number")) {
        throw new Error("Input must be a JSON array of numbers");
      }
      if (arr.length < 2) throw new Error("Array must contain at least 2 elements");
      if (arr.length > 20) throw new Error("Array length must not exceed 20 elements");
      return arr as number[];
    } catch (err) {
      logger.warn(`${caller} rejected: invalid input`, { raw });
      throw err;
    }
  }

  bubbleSort(raw: string) {
    const arr = this.parseArray(raw, "BubbleSort");
    logger.info("BubbleSort: generating steps", { length: arr.length });
    return repo.bubbleSort(arr);
  }

  selectionSort(raw: string) {
    const arr = this.parseArray(raw, "SelectionSort");
    logger.info("SelectionSort: generating steps", { length: arr.length });
    return repo.selectionSort(arr);
  }

  insertionSort(raw: string) {
    const arr = this.parseArray(raw, "InsertionSort");
    logger.info("InsertionSort: generating steps", { length: arr.length });
    return repo.insertionSort(arr);
  }

  mergeSort(raw: string) {
    const arr = this.parseArray(raw, "MergeSort");
    logger.info("MergeSort: generating steps", { length: arr.length });
    return repo.mergeSort(arr);
  }

  quickSort(raw: string) {
    const arr = this.parseArray(raw, "QuickSort");
    logger.info("QuickSort: generating steps", { length: arr.length });
    return repo.quickSort(arr);
  }

  heapSort(raw: string) {
    const arr = this.parseArray(raw, "HeapSort");
    logger.info("HeapSort: generating steps", { length: arr.length });
    return repo.heapSort(arr);
  }
}
