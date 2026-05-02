import { logger } from "../logger/logger";
import { GraphRepository } from "../repositories/graph.repository";
import { AdjList } from "../types";

const repo = new GraphRepository();

export class GraphService {
  bfs(adjList: AdjList, root: string | number, target: string | number) {
    if (!adjList || typeof adjList !== "object" || root === undefined || target === undefined) {
      throw new Error("Invalid input");
    }
    if (!adjList[root]){
      logger.warn("Root node not provided for BFS");

      throw new Error("Root node not found");
    }

    logger.info("BFS algo steps generated");

    return repo.bfs(adjList, root, target);
  }

  dfs(adjList: AdjList, root: string | number, target: string | number) {
    if (!adjList || typeof adjList !== "object" || root === undefined || target === undefined) {
      throw new Error("Invalid input");
    }
    if (!adjList[root]){
      logger.warn("Root node not provided for DFS");

      throw new Error("Root node not found");
    }
    logger.info("BFS algo steps generated");

    return repo.dfs(adjList, root, target);
  }
}
