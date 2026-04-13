import { Request, Response } from "express";
import { LinkedListService } from "../services/linkedlist.service";
import { logger } from "../logger/logger";

const service = new LinkedListService();

export class LinkedListController {
  singlyInsertion(req: Request, res: Response): void {
    logger.http("Generate Singly LinkedList Insertion algo steps request received", {
      ip: req.ip
    });

    const { arr, index, value } = req.body;
    const steps = service.singlyInsertion(arr, index, value);
    res.status(200).json({ message: "success", steps });
  }

  singlyDeletion(req: Request, res: Response): void {
    logger.http("Generate Singly LinkedList Deletion algo steps request received", {
      ip: req.ip
    });

    const { arr, index } = req.body;
    const steps = service.singlyDeletion(arr, index);
    res.status(200).json({ message: "success", steps });
  }

  singlyReversal(req: Request, res: Response): void {
    logger.http("Generate Singly Linked List Reversal algo steps request received", {
      ip: req.ip
    });

    const { arr } = req.body;
    const steps = service.singlyReversal(arr);
    res.status(200).json({ message: "success", steps });
  }

  doublyInsertion(req: Request, res: Response): void {
    logger.http("Generate Doubly LinkedList Insertion algo steps request received", {
      ip: req.ip
    });

    const { arr, index, value } = req.body;
    const steps = service.doublyInsertion(arr, index, value);
    res.status(200).json({ message: "success", steps });
  }

  doublyDeletion(req: Request, res: Response): void {
    logger.http("Generate Doubly LinkedList Deletion algo steps request received", {
      ip: req.ip
    });

    const { arr, index } = req.body;
    const steps = service.doublyDeletion(arr, index);
    res.status(200).json({ message: "success", steps });
  }

  doublyReversal(req: Request, res: Response): void {
    logger.http("Generate Doubly Linked List Reversal algo steps request received", {
      ip: req.ip
    });

    const { arr } = req.body;
    const steps = service.doublyReversal(arr);
    res.status(200).json({ message: "success", steps });
  }
}
