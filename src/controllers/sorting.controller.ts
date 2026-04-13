import { Request, Response } from "express";
import { SortingService } from "../services/sorting.service";
import { logger } from "../logger/logger";

const service = new SortingService();

export class SortingController {
  bubbleSort(req: Request, res: Response): void {
    logger.http("Generate Bubble Sort algo steps request received", {
      ip: req.ip
    });

    const steps = service.bubbleSort(req.body.arr);
    res.status(200).json({ message: "success", arr: steps });
  }

  selectionSort(req: Request, res: Response): void {
    logger.http("Generate Selection Sort algo steps request received", {
      ip: req.ip
    });

    const steps = service.selectionSort(req.body.arr);
    res.status(200).json({ message: "success", arr: steps });
  }

  insertionSort(req: Request, res: Response): void {
    logger.http("Generate Insertion Sort algo steps request received", {
      ip: req.ip
    });

    const steps = service.insertionSort(req.body.arr);
    res.status(200).json({ message: "success", arr: steps });
  }

  mergeSort(req: Request, res: Response): void {
    logger.http("Generate Merge Sort algo steps request received", {
      ip: req.ip
    });

    const steps = service.mergeSort(req.body.arr);
    res.status(200).json({ message: "success", arr: steps });
  }

  quickSort(req: Request, res: Response): void {
    logger.http("Generate Quick Sort algo steps request received", {
      ip: req.ip
    });

    const steps = service.quickSort(req.body.arr);
    res.status(200).json({ message: "success", arr: steps });
  }

  heapSort(req: Request, res: Response): void {
    logger.http("Generate Heap Sort algo steps request received", {
      ip: req.ip
    });

    const steps = service.heapSort(req.body.arr);
    res.status(200).json({ message: "success", arr: steps });
  }
}
