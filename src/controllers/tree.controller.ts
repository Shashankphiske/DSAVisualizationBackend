import { Request, Response } from "express";
import { TreeService } from "../services/tree.service";
import { logger } from "../logger/logger";

const service = new TreeService();

export class TreeController {
  inorder(req: Request, res: Response): void {
    logger.http("Generate Inorder algo steps request received", {
      ip: req.ip
    });

    try {
      const steps = service.inorder(req.body.adj);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid adjacency list";
      res.status(400).json({ message, arr: [] });
    }
  }

  preorder(req: Request, res: Response): void {
    logger.http("Generate Preorder algo steps request received", {
      ip: req.ip
    });

    try {
      const steps = service.preorder(req.body.adj);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid adjacency list";
      res.status(400).json({ message, arr: [] });
    }
  }

  postorder(req: Request, res: Response): void {
    try {
      const steps = service.postorder(req.body.adj);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid adjacency list";
      res.status(400).json({ message, arr: [] });
    }
  }
}
