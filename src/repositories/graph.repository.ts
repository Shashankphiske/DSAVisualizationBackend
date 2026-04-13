import { AdjList, BFSStep, DFSStep } from "../types";

export class GraphRepository {
  bfs(adjList: AdjList, root: string | number, target: string | number): BFSStep[] {
    const steps: BFSStep[] = [];
    const queue: (string | number)[] = [];
    const visited = new Set<string | number>();

    queue.push(root);
    visited.add(root);

    while (queue.length > 0) {
      const queueSnapshot = [...queue];
      const current = queue.shift()!;
      const neighbours = Array.isArray(adjList[current]) ? adjList[current] : [];

      const step: BFSStep = { num: current, neighbours, queue: queueSnapshot, found: false };

      if (current == target) {
        step.found = true;
        steps.push(step);
        break;
      }
      steps.push(step);

      for (const neighbor of neighbours) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return steps;
  }

  dfs(adjList: AdjList, root: string | number, target: string | number): DFSStep[] {
    const steps: DFSStep[] = [];
    const stack: (string | number)[] = [];
    const visited = new Set<string | number>();

    stack.unshift(root);
    visited.add(root);

    while (stack.length !== 0) {
      const stackSnapshot = [...stack];
      const current = stack.shift()!;
      const neighbours = Array.isArray(adjList[current]) ? adjList[current] : [];

      const step: DFSStep = { stack: stackSnapshot, neighbours, current, found: false };

      if (current == target) {
        step.found = true;
        steps.push(step);
        break;
      }
      steps.push(step);

      for (let i = neighbours.length - 1; i >= 0; i--) {
        const neighbor = neighbours[i];
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.unshift(neighbor);
        }
      }
    }
    return steps;
  }
}
