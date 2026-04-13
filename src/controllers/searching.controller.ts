import { Request, Response } from "express";
import { SearchingService } from "../services/searching.service";
import { logger } from "../logger/logger";

const service = new SearchingService();

export class SearchingController {
  linearSearch(req: Request, res: Response): void {
    logger.http("Generate Linear Search algo steps request received", {
      ip: req.ip
    });

    const steps = service.linearSearch(req.body.arr, req.body.num);
    res.status(200).json({ message: "success", arr: steps });
  }

  binarySearch(req: Request, res: Response): void {
    logger.http("Generate Binary Search algo steps request received", {
      ip: req.ip
    });

    const steps = service.binarySearch(req.body.arr, req.body.num);
    res.status(200).json({ message: "success", arr: steps });
  }
}
