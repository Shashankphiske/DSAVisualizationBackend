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
    const n = a.length;
    const sortedSet = new Set<number>();

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const comparing: SortStep = {
          arr: [...a],
          comparing: [j, j + 1],
          swapped: false,
          sorted: [...sortedSet],
          explanation: `Comparing a[${j}]=${a[j]} and a[${j + 1}]=${a[j + 1]}`,
        };

        if (a[j] > a[j + 1]) {
          comparing.swapped = true;
          comparing.explanation = `a[${j}]=${a[j]} > a[${j + 1}]=${a[j + 1]} — swapping`;
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          comparing.arr = [...a];
        }

        steps.push(comparing);
      }

      sortedSet.add(n - 1 - i);
      steps.push({
        arr: [...a],
        comparing: [],
        swapped: false,
        sorted: [...sortedSet],
        explanation: `Pass ${i + 1} complete — element ${a[n - 1 - i]} is in its final position`,
      });
    }

    sortedSet.add(0);
    steps.push({
      arr: [...a],
      comparing: [],
      swapped: false,
      sorted: [...sortedSet],
      explanation: "Bubble Sort complete",
    });

    return steps;
  }

  selectionSort(arr: number[]): SelectionSortStep[] {
    const steps: SelectionSortStep[] = [];
    const a = [...arr];
    const n = a.length;
    const sortedSet = new Set<number>();

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < n; j++) {
        steps.push({
          arr: [...a],
          comparing: [minIdx, j],
          selectedMin: minIdx,
          swapped: false,
          sorted: [...sortedSet],
          explanation: `Checking if a[${j}]=${a[j]} < current min a[${minIdx}]=${a[minIdx]}`,
        });
        if (a[j] < a[minIdx]) minIdx = j;
      }

      if (minIdx !== i) {
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
        steps.push({
          arr: [...a],
          comparing: [i, minIdx],
          selectedMin: null,
          swapped: true,
          sorted: [...sortedSet],
          explanation: `Placing minimum ${a[i]} at index ${i}`,
        });
      }

      sortedSet.add(i);
      steps.push({
        arr: [...a],
        comparing: [],
        selectedMin: null,
        swapped: false,
        sorted: [...sortedSet],
        explanation: `Index ${i} finalised with value ${a[i]}`,
      });
    }

    sortedSet.add(n - 1);
    steps.push({
      arr: [...a],
      comparing: [],
      selectedMin: null,
      swapped: false,
      sorted: [...sortedSet],
      explanation: "Selection Sort complete",
    });

    return steps;
  }

  insertionSort(arr: number[]): InsertionSortStep[] {
    const steps: InsertionSortStep[] = [];
    const a = [...arr];
    const n = a.length;
    const sortedSet = new Set<number>([0]);

    for (let i = 1; i < n; i++) {
      const key = a[i];
      let j = i - 1;

      steps.push({
        arr: [...a],
        comparing: [i],
        keyIndex: i,
        swapped: false,
        sorted: [...sortedSet],
        explanation: `Key = ${key}; inserting into sorted portion [0..${i - 1}]`,
      });

      while (j >= 0 && a[j] > key) {
        steps.push({
          arr: [...a],
          comparing: [j, j + 1],
          keyIndex: i,
          swapped: false,
          sorted: [...sortedSet],
          explanation: `a[${j}]=${a[j]} > key=${key} — shifting right`,
        });

        a[j + 1] = a[j];

        steps.push({
          arr: [...a],
          comparing: [j + 1],
          keyIndex: i,
          swapped: true,
          sorted: [...sortedSet],
          explanation: `Moved ${a[j + 1]} from index ${j} to index ${j + 1}`,
        });

        j--;
      }

      a[j + 1] = key;
      sortedSet.add(i);

      steps.push({
        arr: [...a],
        comparing: [j + 1],
        keyIndex: null,
        swapped: false,
        sorted: [...sortedSet],
        explanation: `Inserted ${key} at index ${j + 1}`,
      });
    }

    steps.push({
      arr: [...a],
      comparing: [],
      keyIndex: null,
      swapped: false,
      sorted: a.map((_, idx) => idx),
      explanation: "Insertion Sort complete",
    });

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
          mergedIndexes: result.map((_, k) => startIndex + k),
          swapped: false,
          sorted: [],
          explanation: `Comparing ${left[i]} (left) and ${right[j]} (right)`,
        });

        if (left[i] <= right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }

      while (i < left.length) result.push(left[i++]);
      while (j < right.length) result.push(right[j++]);

      for (let k = 0; k < result.length; k++) {
        a[startIndex + k] = result[k];
        steps.push({
          arr: [...a],
          comparing: [startIndex + k],
          mergedIndexes: Array.from({ length: k + 1 }, (_, x) => startIndex + x),
          swapped: true,
          sorted: [],
          explanation: `Placed ${result[k]} at index ${startIndex + k}`,
        });
      }

      return result;
    };

    const sort = (subArr: number[], startIndex = 0): number[] => {
      if (subArr.length <= 1) return subArr;
      const mid = Math.floor(subArr.length / 2);

      steps.push({
        arr: [...a],
        comparing: [startIndex, startIndex + subArr.length - 1],
        mergedIndexes: [],
        swapped: false,
        sorted: [],
        explanation: `Dividing subarray [${startIndex}..${startIndex + subArr.length - 1}] at mid=${startIndex + mid - 1}`,
      });

      const left = sort(subArr.slice(0, mid), startIndex);
      const right = sort(subArr.slice(mid), startIndex + mid);
      return merge(left, right, startIndex);
    };

    sort([...a]);

    steps.push({
      arr: [...a],
      comparing: [],
      mergedIndexes: [],
      swapped: false,
      sorted: a.map((_, idx) => idx),
      explanation: "Merge Sort complete",
    });

    return steps;
  }

  quickSort(arr: number[]): QuickSortStep[] {
    const steps: QuickSortStep[] = [];
    const a = [...arr];
    const finalPositions = new Set<number>();

    const partition = (low: number, high: number): number => {
      const pivot = a[high];

      steps.push({
        arr: [...a],
        comparing: [],
        pivotIndex: high,
        swapped: false,
        sorted: [...finalPositions],
        explanation: `Pivot = ${pivot} (index ${high})`,
      });

      let i = low - 1;

      for (let j = low; j < high; j++) {
        steps.push({
          arr: [...a],
          comparing: [j, high],
          pivotIndex: high,
          swapped: false,
          sorted: [...finalPositions],
          explanation: `Comparing a[${j}]=${a[j]} with pivot ${pivot}`,
        });

        if (a[j] < pivot) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
          steps.push({
            arr: [...a],
            comparing: [i, j],
            pivotIndex: high,
            swapped: true,
            sorted: [...finalPositions],
            explanation: `a[${j}]=${a[j + 1 > high ? j : i]} < pivot — swapping indices ${i} and ${j}`,
          });
        }
      }

      [a[i + 1], a[high]] = [a[high], a[i + 1]];
      finalPositions.add(i + 1);

      steps.push({
        arr: [...a],
        comparing: [i + 1],
        pivotIndex: null,
        swapped: true,
        sorted: [...finalPositions],
        explanation: `Pivot ${pivot} placed at final index ${i + 1}`,
      });

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

    steps.push({
      arr: [...a],
      comparing: [],
      pivotIndex: null,
      swapped: false,
      sorted: a.map((_, idx) => idx),
      explanation: "Quick Sort complete",
    });

    return steps;
  }

  heapSort(arr: number[]): HeapSortStep[] {
    const steps: HeapSortStep[] = [];
    const a = [...arr];
    const n = a.length;
    const sortedSet = new Set<number>();

    const heapify = (size: number, i: number): void => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < size) {
        steps.push({
          arr: [...a],
          comparing: [i, left],
          heapRange: size,
          swapped: false,
          sorted: [...sortedSet],
          explanation: `Comparing parent a[${i}]=${a[i]} with left child a[${left}]=${a[left]}`,
        });
        if (a[left] > a[largest]) largest = left;
      }

      if (right < size) {
        steps.push({
          arr: [...a],
          comparing: [largest, right],
          heapRange: size,
          swapped: false,
          sorted: [...sortedSet],
          explanation: `Comparing a[${largest}]=${a[largest]} with right child a[${right}]=${a[right]}`,
        });
        if (a[right] > a[largest]) largest = right;
      }

      if (largest !== i) {
        [a[i], a[largest]] = [a[largest], a[i]];
        steps.push({
          arr: [...a],
          comparing: [i, largest],
          heapRange: size,
          swapped: true,
          sorted: [...sortedSet],
          explanation: `Swapping a[${i}]=${a[largest]} and a[${largest}]=${a[i]} to restore heap property`,
        });
        heapify(size, largest);
      }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);

    for (let i = n - 1; i > 0; i--) {
      [a[0], a[i]] = [a[i], a[0]];
      sortedSet.add(i);
      steps.push({
        arr: [...a],
        comparing: [0, i],
        heapRange: i,
        swapped: true,
        sorted: [...sortedSet],
        explanation: `Moved max ${a[i]} to final position ${i}`,
      });
      heapify(i, 0);
    }

    sortedSet.add(0);
    steps.push({
      arr: [...a],
      comparing: [],
      heapRange: 0,
      swapped: false,
      sorted: [...sortedSet],
      explanation: "Heap Sort complete",
    });

    return steps;
  }
}
