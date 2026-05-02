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

    // Init step
    steps.push({
      priorityQ: [...pq],
      currentNode: start,
      neighbors: [],
      distances: { ...distances },
      previous: { ...previous },
      visited: [],
      found: false,
      action: "init",
      reason: `Initialized distances. Starting at node ${start} with distance 0.`,
    });

    while (pq.length > 0) {
      pq.sort((a, b) => a.distance - b.distance);
      const { node: currentNode } = pq.shift()!;

      if (visited.has(currentNode)) continue;
      visited.add(currentNode);

      // Check if destination reached
      if (currentNode === end) {
        steps.push({
          priorityQ: [...pq],
          currentNode,
          neighbors: [],
          distances: { ...distances },
          previous: { ...previous },
          visited: Array.from(visited),
          found: true,
          action: "found",
          reason: `🎯 Reached destination ${end}! Shortest path found.`,
        });
        break;
      }

      // Select step — popped from pq
      steps.push({
        priorityQ: [...pq],
        currentNode,
        neighbors: [],
        distances: { ...distances },
        previous: { ...previous },
        visited: Array.from(visited),
        found: false,
        action: "select",
        reason: `Selected node ${currentNode} with distance ${distances[currentNode]} from the priority queue.`,
      });

      // Evaluate neighbors
      for (const neighbor in adj[currentNode]) {
        const weight = adj[currentNode][neighbor];
        const newDist = distances[currentNode] + weight;

        // Check step
        steps.push({
          priorityQ: [...pq],
          currentNode,
          neighbors: [neighbor],
          distances: { ...distances },
          previous: { ...previous },
          visited: Array.from(visited),
          found: false,
          action: "check",
          reason: `Checking neighbor ${neighbor}: current best is ${distances[neighbor] === Infinity ? "∞" : distances[neighbor]}, new path via ${currentNode} costs ${newDist}.`,
        });

        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = currentNode;
          pq.push({ node: neighbor, distance: newDist });

          // Relax step
          steps.push({
            priorityQ: [...pq],
            currentNode,
            neighbors: [neighbor],
            distances: { ...distances },
            previous: { ...previous },
            visited: Array.from(visited),
            found: false,
            action: "relax",
            reason: `Updated distance to ${neighbor} → ${newDist} (via ${currentNode}). Added to priority queue.`,
          });
        }
      }
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

    // INIT STEP
    steps.push({
      action: "init",
      reason: `Initialize with start node ${start}`,
      priorityQ: [...pq],
      currentNode: null,
      neighbors: [],
      gScore: { ...gScore },
      fScore: { ...fScore },
      previous: {},
      visited: [],
      found: false,
    });

    while (pq.length > 0) {
      pq.sort((a, b) => a.f - b.f);
      const currentNode = pq.shift()!.node;

      if (visited.has(currentNode)) continue;

      // SELECT STEP
      steps.push({
        action: "select",
        reason: `Selected ${currentNode} (lowest fScore in priority queue)`,
        priorityQ: [...pq],
        currentNode,
        neighbors: [],
        gScore: { ...gScore },
        fScore: { ...fScore },
        previous: { ...previous },
        visited: Array.from(visited),
        found: false,
      });

      visited.add(currentNode);

      if (currentNode === end) {
        steps.push({
          action: "found",
          reason: `${end} reached. Algorithm completed.`,
          priorityQ: [...pq],
          currentNode,
          neighbors: [],
          gScore: { ...gScore },
          fScore: { ...fScore },
          previous: { ...previous },
          visited: Array.from(visited),
          found: true,
        });
        break;
      }

      for (const neighbor in adj[currentNode]) {
        const weight = adj[currentNode][neighbor];
        const tentativeG = gScore[currentNode] + weight;

        const better = tentativeG < gScore[neighbor];

        // CHECK STEP (why edge is evaluated)
        steps.push({
          action: "check",
          reason: `Checking edge ${currentNode} → ${neighbor}`,
          priorityQ: [...pq],
          currentNode,
          neighbors: [neighbor],
          gScore: { ...gScore },
          fScore: { ...fScore },
          previous: { ...previous },
          visited: Array.from(visited),
          found: false,
        });

        if (better) {
          previous[neighbor] = currentNode;
          gScore[neighbor] = tentativeG;
          fScore[neighbor] =
            tentativeG + (heuristic[neighbor] || 0);

          pq.push({ node: neighbor, f: fScore[neighbor] });

          // RELAX STEP
          steps.push({
            action: "relax",
            reason: `Updated ${neighbor}: new gScore=${tentativeG}, fScore=${fScore[neighbor]}`,
            priorityQ: [...pq],
            currentNode,
            neighbors: [neighbor],
            gScore: { ...gScore },
            fScore: { ...fScore },
            previous: { ...previous },
            visited: Array.from(visited),
            found: false,
          });
        }
      }
    }

    return steps;
  }
}
