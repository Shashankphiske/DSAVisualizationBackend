import { Request, Response } from "express";
import { SortingService } from "../services/sorting.service";
import { logger } from "../logger/logger";

const service = new SortingService();

export class SortingController {

  bubbleSort(req: Request, res: Response): void {
    try {
      logger.http("POST /sortingalgo/bubblesort", { ip: req.ip });
      const steps = service.bubbleSort(req.body.arr);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input" });
    }
  }

  selectionSort(req: Request, res: Response): void {
    try {
      logger.http("POST /sortingalgo/selectionsort", { ip: req.ip });
      const steps = service.selectionSort(req.body.arr);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input" });
    }
  }

  insertionSort(req: Request, res: Response): void {
    try {
      logger.http("POST /sortingalgo/insertionsort", { ip: req.ip });
      const steps = service.insertionSort(req.body.arr);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input" });
    }
  }

  mergeSort(req: Request, res: Response): void {
    try {
      logger.http("POST /sortingalgo/mergesort", { ip: req.ip });
      const steps = service.mergeSort(req.body.arr);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input" });
    }
  }

  quickSort(req: Request, res: Response): void {
    try {
      logger.http("POST /sortingalgo/quicksort", { ip: req.ip });
      const steps = service.quickSort(req.body.arr);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input" });
    }
  }

  heapSort(req: Request, res: Response): void {
    try {
      logger.http("POST /sortingalgo/heapsort", { ip: req.ip });
      const steps = service.heapSort(req.body.arr);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      res.status(400).json({ message: err instanceof Error ? err.message : "Invalid input" });
    }
  }
}
