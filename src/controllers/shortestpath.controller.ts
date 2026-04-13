import { Request, Response } from "express";
import { ShortestPathService } from "../services/shortestpath.service";
import { logger } from "../logger/logger";

const service = new ShortestPathService();

export class ShortestPathController {
  dijkstra(req: Request, res: Response): void {
    logger.http("Generate Dijkstras algo steps request received", {
      ip: req.ip
    });

    try {
      const { adj, start, end } = req.body;
      const steps = service.dijkstra(adj, start, end);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid input";
      res.status(400).json({ message, arr: [] });
    }
  }

  aStar(req: Request, res: Response): void {
    logger.http("Generate A Star algo steps request received", {
      ip: req.ip
    });

    try {
      const { adj, start, end, heuristic } = req.body;
      const steps = service.aStar(adj, start, end, heuristic);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid input";
      res.status(400).json({ message, arr: [] });
    }
  }
}
