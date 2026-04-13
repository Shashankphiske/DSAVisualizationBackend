import { logger } from "../logger/logger";
import { SearchingRepository } from "../repositories/searching.repository";

const repo = new SearchingRepository();

export class SearchingService {
  linearSearch(raw: string, num: number) {
    const arr: number[] = JSON.parse(raw);
    const steps = repo.linearSearch(arr, num);

    logger.info("Linear search steps generated", { target: num, arrayLength: arr.length });

    return steps;
  }

  binarySearch(raw: string, num: number) {
    const arr: number[] = JSON.parse(raw);
    const steps = repo.binarySearch(arr, num);

    logger.info("Binary search steps generated", { target: num, arrayLength: arr.length });

    return steps;
  }
}
