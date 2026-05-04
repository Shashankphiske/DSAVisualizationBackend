import { QuizQuestion } from "../types";

export class QuizRepository {

  private readonly questions: QuizQuestion[] = [
    // sorting
    {
      id: 1,
      dsaCategory: "sorting",
      difficulty: "beginner",
      question: "Array: [3, 1, 4, 2]. After ONE complete pass of Bubble Sort, what is the array?",
      options: ["[1, 3, 2, 4]", "[1, 2, 3, 4]", "[3, 1, 2, 4]", "[1, 3, 4, 2]"],
      correctIndex: 0,
      explanation: "After one full pass the largest element (4) bubbles to the end. Comparisons: 3>1 → swap [1,3,4,2]; 3<4 → no swap; 4>2 → swap → [1,3,2,4].",
    },
    {
      id: 2,
      dsaCategory: "sorting",
      difficulty: "intermediate",
      question: "Quick Sort (last-element pivot) on [5,3,8,4,2]. After partition with pivot=2, pivot is at index:",
      options: ["0", "1", "2", "3"],
      correctIndex: 0,
      explanation: "All elements (5,3,8,4) are greater than pivot 2, so i never advances from lo-1. Pivot swaps to index 0.",
    },
    {
      id: 3,
      dsaCategory: "sorting",
      difficulty: "intermediate",
      question: "Merge Sort on [4,1,3,2]. What are the two final subarrays merged?",
      options: ["[1,4] and [2,3]", "[1,2] and [3,4]", "[4,1] and [2,3]", "[1,3] and [2,4]"],
      correctIndex: 0,
      explanation: "Left half [4,1] sorts to [1,4]. Right half [3,2] sorts to [2,3]. Final merge: [1,4] + [2,3] → [1,2,3,4].",
    },
    {
      id: 4,
      dsaCategory: "sorting",
      difficulty: "advanced",
      question: "Insertion Sort on [7,3,5,1]. After processing the element at index 2 (value 5), the sorted portion is:",
      options: ["[3,5,7]", "[3,7,5]", "[5,7,3]", "[1,3,5]"],
      correctIndex: 0,
      explanation: "Process index 1: 3<7 → [3,7,5,1]. Process index 2: 5<7 shift → 5 inserted → [3,5,7,1]. Sorted portion: [3,5,7].",
    },
    {
      id: 5,
      dsaCategory: "sorting",
      difficulty: "advanced",
      question: "What is the worst-case time complexity of Quick Sort?",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      correctIndex: 1,
      explanation: "When the pivot is always the minimum or maximum element (already-sorted input), every partition produces subarrays of size 0 and n-1, yielding T(n)=T(n-1)+O(n) → O(n²).",
    },

    // searching
    {
      id: 6,
      dsaCategory: "searching",
      difficulty: "beginner",
      question: "Binary Search on [2,5,8,12,16,23,38,45]. Target = 16. How many element comparisons are made?",
      options: ["2", "3", "4", "5"],
      correctIndex: 1,
      explanation: "mid=3 (12<16) → search right. mid=5 (23>16) → search left. mid=4 (16=16) → found. 3 comparisons.",
    },
    {
      id: 7,
      dsaCategory: "searching",
      difficulty: "intermediate",
      question: "Linear search on [10,30,20,50,40] for target 20. How many comparisons until found?",
      options: ["1", "2", "3", "4"],
      correctIndex: 2,
      explanation: "Compare 10 (index 0) — no. Compare 30 (index 1) — no. Compare 20 (index 2) — found. 3 comparisons.",
    },

    // ── Stack ─────────────────────────────────────────────────
    {
      id: 8,
      dsaCategory: "stack",
      difficulty: "beginner",
      question: "Stack: [10,20,30,40] (40 on top). After 2 pops, what is the new top?",
      options: ["10", "20", "30", "40"],
      correctIndex: 1,
      explanation: "Pop 40 → top=30. Pop 30 → top=20. Stack is [10,20]; top = 20.",
    },
    {
      id: 9,
      dsaCategory: "stack",
      difficulty: "intermediate",
      question: "Push 5, 10, 15 onto an empty stack, then pop twice. What remains?",
      options: ["[5]", "[5, 10]", "[10, 15]", "[5, 15]"],
      correctIndex: 0,
      explanation: "Stack after pushes (bottom→top): [5,10,15]. Pop 15, pop 10. Remaining: [5].",
    },

    // linked list
    {
      id: 10,
      dsaCategory: "linkedlist",
      difficulty: "beginner",
      question: "Singly linked list: 10→20→30→40. Insert 25 at position 2 (0-indexed). Result?",
      options: ["10→25→20→30→40", "10→20→25→30→40", "10→20→30→25→40", "25→10→20→30→40"],
      correctIndex: 1,
      explanation: "Position 2 (0-indexed) is between 20 and 30. Traverse to node 20, set newNode.next=30, node20.next=25. Result: 10→20→25→30→40.",
    },
    {
      id: 11,
      dsaCategory: "linkedlist",
      difficulty: "intermediate",
      question: "Reversing 1→2→3→4→5. After processing node 3, what is prev?",
      options: ["1", "2", "3", "4"],
      correctIndex: 2,
      explanation: "After processing 1: prev=1. After processing 2: prev=2. After processing 3: prev=3 (its next now points to 2).",
    },

    // graph
    {
      id: 12,
      dsaCategory: "graph",
      difficulty: "intermediate",
      question: "BFS from node A in graph A→{B,C}, B→{D}, C→{D}. In what order are nodes visited?",
      options: ["A,B,C,D", "A,C,B,D", "A,B,D,C", "A,D,B,C"],
      correctIndex: 0,
      explanation: "BFS uses a queue (FIFO). Start: queue=[A]. Visit A → enqueue B,C → queue=[B,C]. Visit B → enqueue D → queue=[C,D]. Visit C (D already queued). Visit D. Order: A,B,C,D.",
    },

    // dp
    {
      id: 13,
      dsaCategory: "dp",
      difficulty: "intermediate",
      question: "Fibonacci DP: dp[0]=0, dp[1]=1. What is dp[6]?",
      options: ["6", "8", "10", "13"],
      correctIndex: 1,
      explanation: "dp[2]=1, dp[3]=2, dp[4]=3, dp[5]=5, dp[6]=8.",
    },
    {
      id: 14,
      dsaCategory: "dp",
      difficulty: "advanced",
      question: "Coin Change: coins=[1,3,4], amount=6. Minimum coins needed?",
      options: ["2", "3", "4", "6"],
      correctIndex: 0,
      explanation: "dp[3]=1 (coin 3), dp[6]=dp[3]+1=2 (3+3=6). Minimum is 2 coins.",
    },
  ];

  findAll(): QuizQuestion[] {
    return this.questions;
  }

  findById(id: number): QuizQuestion | undefined {
    return this.questions.find(q => q.id === id);
  }

  findByCategory(category: string): QuizQuestion[] {
    return this.questions.filter(q => q.dsaCategory === category);
  }

  findByDifficulty(difficulty: string): QuizQuestion[] {
    return this.questions.filter(q => q.difficulty === difficulty);
  }
}
