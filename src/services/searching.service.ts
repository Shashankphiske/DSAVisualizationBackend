import { logger } from "../logger/logger";
import { SearchingRepository } from "../repositories/searching.repository";

const repo = new SearchingRepository();

export class SearchingService {

  private parseArray(raw: string, caller: string): number[] {
    try {
      const arr: unknown = JSON.parse(raw);
      if (!Array.isArray(arr) || arr.some(v => typeof v !== "number")) {
        throw new Error("Input must be a JSON array of numbers");
      }
      return arr as number[];
    } catch (err) {
      logger.warn(`${caller} rejected: invalid array`, { raw });
      throw err;
    }
  }

  linearSearch(raw: string, num: number) {
    const arr = this.parseArray(raw, "LinearSearch");
    logger.info("LinearSearch: generating steps", { target: num, length: arr.length });
    return repo.linearSearch(arr, num);
  }

  binarySearch(raw: string, num: number) {
    const arr = this.parseArray(raw, "BinarySearch");
    logger.info("BinarySearch: generating steps", { target: num, length: arr.length });
    return repo.binarySearch(arr, num);
  }
}
