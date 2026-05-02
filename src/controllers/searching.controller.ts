import { Request, Response } from "express";
import { SearchingService } from "../services/searching.service";
import { logger } from "../logger/logger";

const service = new SearchingService();

export class SearchingController {

  linearSearch(req: Request, res: Response): void {
    try {
      logger.http("POST /searchingalgo/linearsearch", { ip: req.ip });
      const steps = service.linearSearch(req.body.arr, req.body.num);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input" });
    }
  }

  binarySearch(req: Request, res: Response): void {
    try {
      logger.http("POST /searchingalgo/binarysearch", { ip: req.ip });
      const steps = service.binarySearch(req.body.arr, req.body.num);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input" });
    }
  }
}
