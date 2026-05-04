// ============================================================
// DSA Visualization Platform — Shared Type Definitions
// Each step type carries exactly the data the frontend
// animation engine needs: current state, highlighted indices,
// an atomic action label, and a human-readable explanation.
// ============================================================

// ─── SORTING ─────────────────────────────────────────────────

export interface SortStep {
  arr: number[];
  comparing: number[];
  swapped: boolean;
  sorted: number[];
  explanation: string;
}

export interface HeapSortStep extends SortStep {
  heapRange: number;
}

export interface InsertionSortStep extends SortStep {
  keyIndex: number | null;
}

export interface MergeSortStep extends SortStep {
  mergedIndexes: number[];
}

export interface QuickSortStep extends SortStep {
  pivotIndex: number | null;
}

export interface SelectionSortStep extends SortStep {
  selectedMin: number | null;
}

// ─── SEARCHING ───────────────────────────────────────────────

export interface LinearSearchStep {
  arr: number[];
  found: boolean;
  index: number;
  eliminated: number[];
  explanation: string;
}

export interface BinarySearchStep {
  arr: number[];
  left: number;
  right: number;
  mid: number;
  found: boolean;
  eliminated: number[];
  explanation: string;
}

// ─── GRAPH ───────────────────────────────────────────────────

export type AdjList = Record<string | number, (string | number)[]>;

export interface BFSStep {
  num: string | number;
  neighbours: (string | number)[];
  queue: (string | number)[];
  found: boolean;
  explanation: string;
}

export interface DFSStep {
  stack: (string | number)[];
  neighbours: (string | number)[];
  current: string | number;
  found: boolean;
  explanation: string;
}

// ─── SHORTEST PATH ────────────────────────────────────────────

export type WeightedAdjList = Record<string, Record<string, number>>;

export interface DijkstraStep {
  priorityQ: { node: string; distance: number }[];
  currentNode: string;
  neighbors: string[];
  distances: Record<string, number>;
  previous: Record<string, string>;
  visited: string[];
  found: boolean;
  action: "init" | "select" | "check" | "relax" | "found";
  reason: string;
}

export interface AStarStep {
  action: string;
  reason: string;
  priorityQ: { node: string; f: number }[];
  currentNode: string | null;
  neighbors: string[];
  gScore: Record<string, number>;
  fScore: Record<string, number>;
  previous: Record<string, string>;
  visited: string[];
  found: boolean;
}

// ─── TREE ─────────────────────────────────────────────────────

export type TreeAdjList = Record<string, [string | null, string | null]>;

export interface TreeStep {
  node: string;
  order: number;
  explanation: string;
}

// linked list

export interface LinkedListStep {
  current: number | null;
  prev: number | null;
  next: number | null;
  list: number[];
  action: "init" | "traverse" | "insert-complete" | "delete-complete" | "reverse-step" | "complete" | "pointer-flipped";
  newNode: number | null;
  explanation: string;
}

// stack

export interface StackStep {
  action: "push-start" | "push-complete" | "pop-start" | "pop-complete" | "underflow";
  pointer: { current: number | null; prev: number | null; next: number | null };
  highlight: (number | null)[];
  list: number[];
  explanation: string;
}

// queue

export interface QueueStep {
  action: "enqueue-start" | "enqueue-complete" | "dequeue-start" | "dequeue-complete" | "underflow";
  pointer: { current: number | null; prev: number | null; next: number | null };
  highlight: (number | null)[];
  list: number[];
  explanation: string;
}

// dp

export interface CoinChangeStep {
  currentAmount: number;
  coin: number | null;
  from: number | null;
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

// quiz

export interface QuizQuestion {
  id: number;
  dsaCategory: "sorting" | "searching" | "linkedlist" | "stack" | "queue" | "graph" | "tree" | "dp";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface QuizAnswerPayload {
  questionId: number;
  selectedIndex: number;
  timeSpentMs: number;
}

export interface QuizAnswerResult {
  questionId: number;
  correct: boolean;
  correctIndex: number;
  explanation: string;
}

export interface UserSession {
  ip: string;
  totalAnswered: number;
  totalCorrect: number;
  byCategory: Record<string, { answered: number; correct: number }>;
  lastUpdated: string;
}

// review

export interface ReviewPayload {
  name: string;
  email: string;
  message: string;
}
