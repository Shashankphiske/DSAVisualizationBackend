// ─── Sorting ────────────────────────────────────────────────────────────────

export interface SortStep {
  arr: number[];
  comparing: number[];
  swapped: boolean;
}

export interface HeapSortStep extends SortStep {
  heapRange: number;
}

export interface InsertionSortStep extends SortStep {
  keyindex: number | null;
}

export interface MergeSortStep extends SortStep {
  mergedIndexes: number[];
}

export interface QuickSortStep extends SortStep {
  pivotIndex: number | null;
}

export interface SelectionSortStep extends SortStep {
  selectedmin: number | null;
}

// ─── Searching ──────────────────────────────────────────────────────────────

export interface LinearSearchStep {
  arr: number[];
  found: boolean;
  index: number;
}

export interface BinarySearchStep {
  arr: number[];
  left: number;
  right: number;
  mid: number;
  found: boolean;
}

// ─── Graph ──────────────────────────────────────────────────────────────────

export type AdjList = Record<string | number, (string | number)[]>;

export interface BFSStep {
  num: string | number;
  neighbours: (string | number)[];
  queue: (string | number)[];
  found: boolean;
}

export interface DFSStep {
  stack: (string | number)[];
  neighbours: (string | number)[];
  current: string | number;
  found: boolean;
}

// ─── Shortest Path ──────────────────────────────────────────────────────────

export type WeightedAdjList = Record<string, Record<string, number>>;

export interface DijkstraStep {
  priorityQ: { node: string; distance: number }[];
  currentNode: string;
  neighbors: string[];
  distances: Record<string, number>;
  previous: Record<string, string>;
  visited: string[];
  found: boolean;
}

export interface AStarStep {
  priorityQ: { node: string; f: number }[];
  currentNode: string;
  neighbors: string[];
  gScore: Record<string, number>;
  fScore: Record<string, number>;
  previous: Record<string, string>;
  visited: string[];
  found: boolean;
}

// ─── Tree ───────────────────────────────────────────────────────────────────

export type TreeAdjList = Record<string, [string | null, string | null]>;

// ─── Linked List ────────────────────────────────────────────────────────────

export interface LinkedListStep {
  current: number | null;
  prev: number | null;
  next: number | null;
  list: number[];
}

// ─── Stack ──────────────────────────────────────────────────────────────────

export interface StackStep {
  action: string;
  pointer: { current: number | null; prev: number | null; next: number | null };
  highlight: (number | null)[];
  list: number[];
}

// ─── Queue ──────────────────────────────────────────────────────────────────

export interface QueueStep {
  action: string;
  pointer: { current: number | null; prev: number | null; next: number | null };
  highlight: (number | null)[];
  list: number[];
}

// ─── Dynamic Programming ────────────────────────────────────────────────────

export interface CoinChangeStep {
  currentAmount: number;
  coin: number | null;
  from?: number;
  dpSnapshot: number[];
  explanation: string;
}

export interface FibonacciStep {
  index: number;
  from?: number[];
  dpSnapshot: number[];
  explanation: string;
}

export interface LCSStep {
  i: number;
  j: number;
  dpSnapshot: number[][];
  chars: [string, string];
  from: [number, number][];
  explanation: string;
}

export interface LCSBacktrackStep {
  i: number;
  j: number;
  action: "match" | "up" | "left";
  char?: string;
}

// ─── Review / Sheets ────────────────────────────────────────────────────────

export interface ReviewPayload {
  name: string;
  email: string;
  message: string;
}
