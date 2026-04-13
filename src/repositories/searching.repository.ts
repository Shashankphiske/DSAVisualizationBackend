import { LinearSearchStep, BinarySearchStep } from "../types";

export class SearchingRepository {
  linearSearch(arr: number[], num: number): LinearSearchStep[] {
    const steps: LinearSearchStep[] = [];

    for (let i = 0; i < arr.length; i++) {
      const step: LinearSearchStep = { arr: [...arr], found: false, index: i };
      if (arr[i] == num) {
        step.found = true;
        steps.push(step);
        break;
      }
      steps.push(step);
    }
    return steps;
  }

  binarySearch(arr: number[], num: number): BinarySearchStep[] {
    const steps: BinarySearchStep[] = [];
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const step: BinarySearchStep = { arr: [...arr], left, right, mid, found: false };

      if (arr[mid] == num) {
        step.found = true;
        steps.push(step);
        break;
      }
      steps.push(step);

      if (num < arr[mid]) right = mid - 1;
      else left = mid + 1;
    }
    return steps;
  }
}
