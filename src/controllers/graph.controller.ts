import { Request, Response } from "express";
import { GraphService } from "../services/graph.service";
import { logger } from "../logger/logger";

const service = new GraphService();

export class GraphController {
  bfs(req: Request, res: Response): void {
    logger.http("Generate Breadth First Search algo steps request received", {
      ip: req.ip
    });

    try {
      const { adjList, root, num } = req.body;
      const steps = service.bfs(adjList, root, num);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid input";
      res.status(400).json({ message, arr: [] });
    }
  }

  dfs(req: Request, res: Response): void {
    logger.http("Generate Depth First Search algo steps request received", {
      ip: req.ip
    });

    try {
      const { adjList, root, num } = req.body;
      const steps = service.dfs(adjList, root, num);
      res.status(200).json({ message: "success", arr: steps });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid input";
      res.status(400).json({ message, arr: [] });
    }
  }
}
