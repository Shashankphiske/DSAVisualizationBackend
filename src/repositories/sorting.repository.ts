import {
  SortStep,
  HeapSortStep,
  InsertionSortStep,
  MergeSortStep,
  QuickSortStep,
  SelectionSortStep,
} from "../types";

export class SortingRepository {
  bubbleSort(arr: number[]): SortStep[] {
    const steps: SortStep[] = [];
    const a = [...arr];

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j <= a.length - i - 2; j++) {
        const step: SortStep = { arr: [...a], comparing: [j, j + 1], swapped: false };
        if (a[j] > a[j + 1]) {
          step.swapped = true;
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
        }
        steps.push(step);
      }
    }
    steps.push({ arr: [...a], comparing: [], swapped: false });
    return steps;
  }

  selectionSort(arr: number[]): SelectionSortStep[] {
    const steps: SelectionSortStep[] = [];
    const a = [...arr];

    for (let i = 0; i < a.length - 1; i++) {
      let minindex = i;
      for (let j = i + 1; j < a.length; j++) {
        steps.push({ arr: [...a], comparing: [minindex, j], selectedmin: minindex, swapped: false });
        if (a[j] < a[minindex]) minindex = j;
      }
      if (minindex !== i) {
        [a[i], a[minindex]] = [a[minindex], a[i]];
        steps.push({ arr: [...a], comparing: [i, minindex], selectedmin: minindex, swapped: true });
      }
    }
    steps.push({ arr: [...a], comparing: [], selectedmin: null, swapped: false });
    return steps;
  }

  insertionSort(arr: number[]): InsertionSortStep[] {
    const steps: InsertionSortStep[] = [];
    const a = [...arr];

    for (let i = 1; i < a.length; i++) {
      const key = a[i];
      let j = i - 1;
      steps.push({ arr: [...a], comparing: [j, i], keyindex: i, swapped: false });

      while (j >= 0 && a[j] > key) {
        [a[j + 1], a[j]] = [a[j], a[j + 1]];
        steps.push({ arr: [...a], comparing: [j, j + 1], keyindex: i, swapped: true });
        j--;
      }
      a[j + 1] = key;
      steps.push({ arr: [...a], comparing: [j + 1, j], keyindex: i, swapped: true });
    }
    steps.push({ arr: [...a], comparing: [], keyindex: null, swapped: false });
    return steps;
  }

  mergeSort(arr: number[]): MergeSortStep[] {
    const steps: MergeSortStep[] = [];
    const a = [...arr];

    const merge = (left: number[], right: number[], startIndex: number): number[] => {
      const result: number[] = [];
      let i = 0, j = 0;

      while (i < left.length && j < right.length) {
        steps.push({
          arr: [...a],
          comparing: [startIndex + i, startIndex + left.length + j],
          mergedIndexes: result.map((_, idx) => startIndex + idx),
          swapped: false,
        });
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
      }
      while (i < left.length) result.push(left[i++]);
      while (j < right.length) result.push(right[j++]);

      for (let k = 0; k < result.length; k++) {
        a[startIndex + k] = result[k];
        steps.push({ arr: [...a], comparing: [startIndex + k], mergedIndexes: [startIndex + k], swapped: true });
      }
      return result;
    };

    const sort = (subArr: number[], startIndex = 0): number[] => {
      if (subArr.length <= 1) return subArr;
      const mid = Math.floor(subArr.length / 2);
      const left = sort(subArr.slice(0, mid), startIndex);
      const right = sort(subArr.slice(mid), startIndex + mid);
      return merge(left, right, startIndex);
    };

    sort([...a]);
    steps.push({ arr: [...a], comparing: [], mergedIndexes: [], swapped: false });
    return steps;
  }

  quickSort(arr: number[]): QuickSortStep[] {
    const steps: QuickSortStep[] = [];
    const a = [...arr];

    const partition = (low: number, high: number): number => {
      const pivot = a[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        steps.push({ arr: [...a], comparing: [j, high], pivotIndex: high, swapped: false });
        if (a[j] < pivot) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
          steps.push({ arr: [...a], comparing: [i, j], pivotIndex: high, swapped: true });
        }
      }
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
      steps.push({ arr: [...a], comparing: [i + 1, high], pivotIndex: high, swapped: true });
      return i + 1;
    };

    const sort = (low: number, high: number): void => {
      if (low < high) {
        const pi = partition(low, high);
        sort(low, pi - 1);
        sort(pi + 1, high);
      }
    };

    sort(0, a.length - 1);
    steps.push({ arr: [...a], comparing: [], pivotIndex: null, swapped: false });
    return steps;
  }

  heapSort(arr: number[]): HeapSortStep[] {
    const steps: HeapSortStep[] = [];
    const a = [...arr];

    const heapify = (n: number, i: number): void => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n) {
        steps.push({ arr: [...a], comparing: [i, left], heapRange: n, swapped: false });
        if (a[left] > a[largest]) largest = left;
      }
      if (right < n) {
        steps.push({ arr: [...a], comparing: [largest, right], heapRange: n, swapped: false });
        if (a[right] > a[largest]) largest = right;
      }
      if (largest !== i) {
        [a[i], a[largest]] = [a[largest], a[i]];
        steps.push({ arr: [...a], comparing: [i, largest], heapRange: n, swapped: true });
        heapify(n, largest);
      }
    };

    const n = a.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
    for (let i = n - 1; i > 0; i--) {
      [a[0], a[i]] = [a[i], a[0]];
      steps.push({ arr: [...a], comparing: [0, i], heapRange: i, swapped: true });
      heapify(i, 0);
    }
    steps.push({ arr: [...a], comparing: [], heapRange: 0, swapped: false });
    return steps;
  }
}
