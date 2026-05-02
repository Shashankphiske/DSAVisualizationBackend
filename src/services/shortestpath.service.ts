import { logger } from "../logger/logger";
import { ShortestPathRepository } from "../repositories/shortestpath.repository";
import { WeightedAdjList } from "../types";

const repo = new ShortestPathRepository();

export class ShortestPathService {
  dijkstra(rawAdj: string | WeightedAdjList, start: string, end: string) {
    if (!rawAdj || !start || !end) {
      logger.warn("Dijkstra failed: Invalid input provided");
      throw new Error("Invalid input");
    }

    const adj: WeightedAdjList = typeof rawAdj === "string" ? JSON.parse(rawAdj) : rawAdj;

    if (!adj[start] || !adj[end]) {
      logger.warn("Dijkstra failed: Start or end node not found", { start, end });
      throw new Error("Start or end node not found");
    }

    const steps = repo.dijkstra(adj, start, end);
    logger.info("Dijkstra shortest path steps generated", { start, end });
    return steps;
  }

  aStar(
    rawAdj: string | WeightedAdjList,
    start: string,
    end: string,
    rawHeuristic?: string | Record<string, number>
  ) {
    if (!rawAdj || !start || !end) {
      logger.warn("A* failed: Invalid input provided");
      throw new Error("Invalid input");
    }

    const adj: WeightedAdjList = typeof rawAdj === "string" ? JSON.parse(rawAdj) : rawAdj;
    const heuristic: Record<string, number> =
      typeof rawHeuristic === "string"
        ? JSON.parse(rawHeuristic)
        : rawHeuristic ?? {};

    if (!adj[start] || !adj[end]) {
      logger.warn("A* failed: Start or end node not found", { start, end });
      throw new Error("Start or end node not found");
    }

    const steps = repo.aStar(adj, start, end, heuristic);
    logger.info("A* shortest path steps generated", { start, end });
    return steps;
  }
}
