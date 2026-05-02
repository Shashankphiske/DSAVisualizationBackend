import { AdjList, BFSStep, DFSStep } from "../types";

export class GraphRepository {

  bfs(adjList: AdjList, root: string | number, target: string | number): BFSStep[] {
    const steps: BFSStep[] = [];
    const queue: (string | number)[] = [root];
    const visited = new Set<string | number>([root]);

    while (queue.length > 0) {
      const queueSnapshot = [...queue];
      const current = queue.shift()!;
      const neighbours = Array.isArray(adjList[current]) ? adjList[current] : [];
      const found = current == target;

      steps.push({
        num: current,
        neighbours,
        queue: queueSnapshot,
        found,
        explanation: found
          ? `Found target ${target} at node ${current}`
          : `Visiting node ${current} — enqueuing unvisited neighbours: [${neighbours.filter(n => !visited.has(n)).join(", ") || "none"}]`,
      });

      if (found) break;

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
    const stack: (string | number)[] = [root];
    const visited = new Set<string | number>([root]);

    while (stack.length > 0) {
      const stackSnapshot = [...stack];
      const current = stack.shift()!;
      const neighbours = Array.isArray(adjList[current]) ? adjList[current] : [];
      const found = current == target;

      steps.push({
        stack: stackSnapshot,
        neighbours,
        current,
        found,
        explanation: found
          ? `Found target ${target} at node ${current}`
          : `Processing node ${current} — pushing unvisited neighbours onto stack`,
      });

      if (found) break;

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
