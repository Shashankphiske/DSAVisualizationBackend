import { LinearSearchStep, BinarySearchStep } from "../types";

/**
 * SearchingRepository
 *
 * Each method produces an atomic step sequence that maps 1-to-1
 * to animation frames in the frontend. The `eliminated` array
 * lets the UI visually fade out indices that are no longer in
 * the search window, providing immediate feedback on the
 * algorithm's narrowing behaviour.
 */
export class SearchingRepository {

  linearSearch(arr: number[], target: number): LinearSearchStep[] {
    const steps: LinearSearchStep[] = [];
    const eliminated: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      const found = arr[i] === target;

      steps.push({
        arr: [...arr],
        found,
        index: i,
        eliminated: [...eliminated],
        explanation: found
          ? `Found ${target} at index ${i}`
          : `a[${i}]=${arr[i]} ≠ ${target} — moving right`,
      });

      if (found) break;
      eliminated.push(i);
    }

    if (steps.length > 0 && !steps[steps.length - 1].found) {
      steps.push({
        arr: [...arr],
        found: false,
        index: -1,
        eliminated: arr.map((_, i) => i),
        explanation: `${target} not found in array`,
      });
    }

    return steps;
  }

  binarySearch(arr: number[], target: number): BinarySearchStep[] {
    const steps: BinarySearchStep[] = [];
    let left = 0;
    let right = arr.length - 1;
    const eliminated = new Set<number>();

    steps.push({
      arr: [...arr],
      left,
      right,
      mid: -1,
      found: false,
      eliminated: [],
      explanation: `Searching for ${target}. Initial window: [0..${right}]`,
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) {
        steps.push({
          arr: [...arr],
          left,
          right,
          mid,
          found: true,
          eliminated: [...eliminated],
          explanation: `Found ${target} at index ${mid}`,
        });
        return steps;
      }

      steps.push({
        arr: [...arr],
        left,
        right,
        mid,
        found: false,
        eliminated: [...eliminated],
        explanation: `mid=${mid}, a[mid]=${arr[mid]} — ${arr[mid] < target ? "target is larger, search right" : "target is smaller, search left"}`,
      });

      if (target > arr[mid]) {
        for (let i = left; i <= mid; i++) eliminated.add(i);
        left = mid + 1;
      } else {
        for (let i = mid; i <= right; i++) eliminated.add(i);
        right = mid - 1;
      }
    }

    steps.push({
      arr: [...arr],
      left: -1,
      right: -1,
      mid: -1,
      found: false,
      eliminated: arr.map((_, i) => i),
      explanation: `${target} not found in array`,
    });

    return steps;
  }
}
