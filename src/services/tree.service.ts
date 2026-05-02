import { logger } from "../logger/logger";
import { TreeRepository } from "../repositories/tree.repository";
import { TreeAdjList } from "../types";

const repo = new TreeRepository();

export class TreeService {
  private validate(adj: unknown): asserts adj is TreeAdjList {
    if (!adj || typeof adj !== "object") {
      logger.warn("Tree traversal failed: Invalid adjacency list provided", { input: adj });
      throw new Error("Invalid adjacency list");
    }
  }

  inorder(adj: unknown) {
    this.validate(adj);
    const steps = repo.inorder(adj as TreeAdjList);
    logger.info("Tree inorder traversal steps generated");
    return steps;
  }

  preorder(adj: unknown) {
    this.validate(adj);
    const steps = repo.preorder(adj as TreeAdjList);
    logger.info("Tree preorder traversal steps generated");
    return steps;
  }

  postorder(adj: unknown) {
    this.validate(adj);
    const steps = repo.postorder(adj as TreeAdjList);
    logger.info("Tree postorder traversal steps generated");
    return steps;
  }
}
