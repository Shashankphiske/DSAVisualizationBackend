import { WeightedAdjList, DijkstraStep, AStarStep } from "../types";

export class ShortestPathRepository {
  dijkstra(adj: WeightedAdjList, start: string, end: string): DijkstraStep[] {
    const steps: DijkstraStep[] = [];
    const distances: Record<string, number> = {};
    const visited = new Set<string>();
    const previous: Record<string, string> = {};
    const pq: { node: string; distance: number }[] = [];

    for (const node of Object.keys(adj)) distances[node] = Infinity;
    distances[start] = 0;
    pq.push({ node: start, distance: 0 });

    while (pq.length > 0) {
      pq.sort((a, b) => a.distance - b.distance);
      const { node: currentNode } = pq.shift()!;

      if (visited.has(currentNode)) continue;
      visited.add(currentNode);

      const step: DijkstraStep = {
        priorityQ: [...pq],
        currentNode,
        neighbors: [],
        distances: { ...distances },
        previous: { ...previous },
        visited: Array.from(visited),
        found: false,
      };

      if (currentNode === end) {
        step.found = true;
        steps.push(step);
        break;
      }

      for (const neighbor in adj[currentNode]) {
        const weight = adj[currentNode][neighbor];
        const newDist = distances[currentNode] + weight;
        step.neighbors.push(neighbor);

        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = currentNode;
          pq.push({ node: neighbor, distance: newDist });
        }
      }

      step.distances = { ...distances };
      step.previous = { ...previous };
      step.priorityQ = [...pq];
      step.visited = Array.from(visited);
      steps.push(step);
    }
    return steps;
  }

  aStar(
    adj: WeightedAdjList,
    start: string,
    end: string,
    heuristic: Record<string, number>
  ): AStarStep[] {
    const steps: AStarStep[] = [];
    const gScore: Record<string, number> = {};
    const fScore: Record<string, number> = {};
    const visited = new Set<string>();
    const previous: Record<string, string> = {};
    const pq: { node: string; f: number }[] = [];

    for (const node of Object.keys(adj)) {
      gScore[node] = Infinity;
      fScore[node] = Infinity;
    }
    gScore[start] = 0;
    fScore[start] = heuristic[start] || 0;
    pq.push({ node: start, f: fScore[start] });

    while (pq.length > 0) {
      pq.sort((a, b) => a.f - b.f);
      const { node: currentNode } = pq.shift()!;

      if (visited.has(currentNode)) continue;
      visited.add(currentNode);

      const step: AStarStep = {
        priorityQ: [...pq],
        currentNode,
        neighbors: [],
        gScore: { ...gScore },
        fScore: { ...fScore },
        previous: { ...previous },
        visited: Array.from(visited),
        found: false,
      };

      if (currentNode === end) {
        step.found = true;
        steps.push(step);
        break;
      }

      for (const neighbor in adj[currentNode]) {
        const weight = adj[currentNode][neighbor];
        const tentativeG = gScore[currentNode] + weight;
        step.neighbors.push(neighbor);

        if (tentativeG < gScore[neighbor]) {
          previous[neighbor] = currentNode;
          gScore[neighbor] = tentativeG;
          fScore[neighbor] = tentativeG + (heuristic[neighbor] || 0);
          pq.push({ node: neighbor, f: fScore[neighbor] });
        }
      }

      step.gScore = { ...gScore };
      step.fScore = { ...fScore };
      step.previous = { ...previous };
      step.priorityQ = [...pq];
      step.visited = Array.from(visited);
      steps.push(step);
    }
    return steps;
  }
}
