import { LinkedListStep } from "../types";

// ─── Node classes ─────────────────────────────────────────────

class SNode {
  val: number;
  next: SNode | null = null;
  constructor(val: number) { this.val = val; }
}

class DNode {
  val: number;
  next: DNode | null = null;
  prev: DNode | null = null;
  constructor(val: number) { this.val = val; }
}

// ─── Builders ────────────────────────────────────────────────

function buildSingly(arr: number[]): SNode | null {
  let head: SNode | null = null, tail: SNode | null = null;
  for (const v of arr) {
    const node = new SNode(v);
    if (!head) { head = tail = node; }
    else { tail!.next = node; tail = node; }
  }
  return head;
}

function buildDoubly(arr: number[]): DNode | null {
  let head: DNode | null = null, tail: DNode | null = null;
  for (const v of arr) {
    const node = new DNode(v);
    if (!head) { head = tail = node; }
    else { tail!.next = node; node.prev = tail; tail = node; }
  }
  return head;
}

function singlyToArray(head: SNode | null): number[] {
  const out: number[] = [];
  for (let t = head; t; t = t.next) out.push(t.val);
  return out;
}

function doublyToArray(head: DNode | null): number[] {
  const out: number[] = [];
  for (let t = head; t; t = t.next) out.push(t.val);
  return out;
}

// ─── Repository ───────────────────────────────────────────────

export class LinkedListRepository {

  // ── Singly Linked List ───────────────────────────────────────

  singlyInsertion(arr: number[], index: number, value: number): LinkedListStep[] {
    const steps: LinkedListStep[] = [];
    let head = buildSingly(arr);
    const list = () => singlyToArray(head);

    steps.push({
      current: null, prev: null, next: head?.val ?? null,
      list: list(), action: "init", newNode: null,
      explanation: `Inserting ${value} at position ${index}`,
    });

    const newNode = new SNode(value);

    if (index === 0) {
      newNode.next = head;
      head = newNode;
      steps.push({
        current: newNode.val, prev: null, next: newNode.next?.val ?? null,
        list: list(), action: "insert-complete", newNode: value,
        explanation: `New node ${value} inserted as new head`,
      });
      return steps;
    }

    let prev: SNode | null = null, curr = head, i = 0;

    while (curr && i < index) {
      steps.push({
        current: curr.val, prev: prev?.val ?? null, next: curr.next?.val ?? null,
        list: list(), action: "traverse", newNode: null,
        explanation: `Traversing: at node ${curr.val} (step ${i + 1} of ${index})`,
      });
      prev = curr; curr = curr.next; i++;
    }

    newNode.next = curr;
    if (prev) prev.next = newNode;

    steps.push({
      current: newNode.val, prev: prev?.val ?? null, next: curr?.val ?? null,
      list: list(), action: "insert-complete", newNode: value,
      explanation: `Node ${value} linked between ${prev?.val ?? "null"} and ${curr?.val ?? "null"}`,
    });

    return steps;
  }

  singlyDeletion(arr: number[], index: number): LinkedListStep[] {
    const steps: LinkedListStep[] = [];
    let head = buildSingly(arr);
    const list = () => singlyToArray(head);

    steps.push({
      current: null, prev: null, next: head?.val ?? null,
      list: list(), action: "init", newNode: null,
      explanation: `Deleting node at position ${index}`,
    });

    if (index === 0) {
      const val = head?.val ?? null;
      head = head?.next ?? null;
      steps.push({
        current: null, prev: null, next: head?.val ?? null,
        list: list(), action: "delete-complete", newNode: null,
        explanation: `Head node ${val} removed`,
      });
      return steps;
    }

    let curr = head, prev: SNode | null = null, i = 0;

    while (curr && i < index) {
      steps.push({
        current: curr.val, prev: prev?.val ?? null, next: curr.next?.val ?? null,
        list: list(), action: "traverse", newNode: null,
        explanation: `Traversing to position ${index}: at node ${curr.val}`,
      });
      prev = curr; curr = curr.next; i++;
    }

    if (curr && prev) {
      steps.push({
        current: curr.val, prev: prev.val, next: curr.next?.val ?? null,
        list: list(), action: "traverse", newNode: null,
        explanation: `Found node ${curr.val} — unlinking`,
      });
      prev.next = curr.next;
      steps.push({
        current: null, prev: prev.val, next: curr.next?.val ?? null,
        list: list(), action: "delete-complete", newNode: null,
        explanation: `Node ${curr.val} removed from position ${index}`,
      });
    }

    return steps;
  }

  singlyReversal(arr: number[]): LinkedListStep[] {
    const steps: LinkedListStep[] = [];

    // Shadow array tracks the visual list at every frame.
    // We cannot use singlyToArray() mid-reversal because mutating .next
    // pointers corrupts the chain — the shadow array is the source of truth.
    //
    // Strategy: as we "flip" each node's pointer, we move that node's value
    // to the front of the shadow array, growing the reversed prefix one step
    // at a time:
    //
    //   arr    = [10, 20, 30, 40, 50]   (original)
    //   i=0  → shadow = [10, 20, 30, 40, 50]  curr=10 highlighted, then flipped
    //   i=1  → shadow = [20, 10, 30, 40, 50]  curr=20 highlighted, then flipped
    //   i=2  → shadow = [30, 20, 10, 40, 50]
    //   ...
    //   done → shadow = [50, 40, 30, 20, 10]

    const shadow = [...arr];

    // ── init ─────────────────────────────────────────────────
    steps.push({
      current: null,
      prev: null,
      next: arr[0] ?? null,
      list: [...shadow],
      action: "init",
      newNode: null,
      explanation: "Initialise: prev=null, curr=head",
    });

    for (let i = 0; i < arr.length; i++) {
      const currVal = arr[i];
      const prevVal = i > 0 ? arr[i - 1] : null;
      const nextVal = i + 1 < arr.length ? arr[i + 1] : null;
      const afterNextVal = i + 2 < arr.length ? arr[i + 2] : null;

      // Sub-step 1 — arrive at node, show its current state
      steps.push({
        current: currVal,
        prev: prevVal,
        next: nextVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `Visiting node ${currVal} — curr.next=${nextVal ?? "null"}, prev=${prevVal ?? "null"}`,
      });

      // Sub-step 2 — save next = curr.next
      steps.push({
        current: currVal,
        prev: prevVal,
        next: nextVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `next = curr.next → next saved as ${nextVal ?? "null"} (so we can still advance after overwriting curr.next)`,
      });

      // Sub-step 3 — curr.next = prev  (the actual pointer flip)
      steps.push({
        current: currVal,
        prev: prevVal,
        next: prevVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `curr.next = prev → node ${currVal}'s pointer now aims at ${prevVal ?? "null"} instead of ${nextVal ?? "null"} ✓`,
      });

      // Update shadow: move currVal to front to show the reversal growing
      shadow.splice(i, 1);
      shadow.unshift(currVal);

      // Sub-step 4 — advance: prev = curr, curr = saved next
      steps.push({
        current: nextVal ?? null,
        prev: currVal,
        next: afterNextVal,
        list: [...shadow],
        action: "pointer-flipped",
        newNode: null,
        explanation: `prev = ${currVal}, curr = ${nextVal ?? "null"} → advanced. Node ${currVal} fully reversed ✓`,
      });
    }

    // ── complete ──────────────────────────────────────────────
    steps.push({
      current: null,
      prev: null,
      next: null,
      list: [...shadow],
      action: "complete",
      newNode: null,
      explanation: "Reversal complete — prev is the new head",
    });

    return steps;
  }

  // ── Doubly Linked List ───────────────────────────────────────

  doublyInsertion(arr: number[], index: number, value: number): LinkedListStep[] {
    const steps: LinkedListStep[] = [];
    let head = buildDoubly(arr);
    const list = () => doublyToArray(head);

    steps.push({
      current: null, prev: null, next: head?.val ?? null,
      list: list(), action: "init", newNode: null,
      explanation: `Inserting ${value} at position ${index} (doubly linked list)`,
    });

    const newNode = new DNode(value);

    if (index === 0) {
      newNode.next = head;
      if (head) head.prev = newNode;
      head = newNode;
      steps.push({
        current: newNode.val, prev: null, next: newNode.next?.val ?? null,
        list: list(), action: "insert-complete", newNode: value,
        explanation: `${value} inserted as new head; next.prev updated`,
      });
      return steps;
    }

    let curr = head, prev: DNode | null = null, i = 0;

    while (curr && i < index) {
      steps.push({
        current: curr.val, prev: prev?.val ?? null, next: curr.next?.val ?? null,
        list: list(), action: "traverse", newNode: null,
        explanation: `Traversing: at node ${curr.val} (step ${i + 1})`,
      });
      prev = curr; curr = curr.next; i++;
    }

    newNode.next = curr;
    newNode.prev = prev;
    if (prev) prev.next = newNode;
    if (curr) curr.prev = newNode;

    steps.push({
      current: newNode.val, prev: prev?.val ?? null, next: curr?.val ?? null,
      list: list(), action: "insert-complete", newNode: value,
      explanation: `${value} linked — prev.next and next.prev both updated`,
    });

    return steps;
  }

  doublyDeletion(arr: number[], index: number): LinkedListStep[] {
    const steps: LinkedListStep[] = [];
    let head = buildDoubly(arr);
    const list = () => doublyToArray(head);

    steps.push({
      current: null, prev: null, next: head?.val ?? null,
      list: list(), action: "init", newNode: null,
      explanation: `Deleting node at position ${index} (doubly linked list)`,
    });

    if (index === 0) {
      const val = head?.val ?? null;
      const nextNode = head?.next ?? null;
      if (nextNode) nextNode.prev = null;
      head = nextNode;
      steps.push({
        current: null, prev: null, next: head?.val ?? null,
        list: list(), action: "delete-complete", newNode: null,
        explanation: `Head ${val} removed; new head.prev set to null`,
      });
      return steps;
    }

    let curr = head, prev: DNode | null = null, i = 0;

    while (curr && i < index) {
      steps.push({
        current: curr.val, prev: prev?.val ?? null, next: curr.next?.val ?? null,
        list: list(), action: "traverse", newNode: null,
        explanation: `Traversing: at node ${curr.val}`,
      });
      prev = curr; curr = curr.next; i++;
    }

    if (curr) {
      steps.push({
        current: curr.val, prev: prev?.val ?? null, next: curr.next?.val ?? null,
        list: list(), action: "traverse", newNode: null,
        explanation: `Found node ${curr.val} at index ${index} — unlinking`,
      });
      const nextNode = curr.next;
      if (prev) prev.next = nextNode;
      if (nextNode) nextNode.prev = prev;
      steps.push({
        current: null, prev: prev?.val ?? null, next: nextNode?.val ?? null,
        list: list(), action: "delete-complete", newNode: null,
        explanation: `${curr.val} removed; prev.next and next.prev updated`,
      });
    }

    return steps;
  }

  doublyReversal(arr: number[]): LinkedListStep[] {
    const steps: LinkedListStep[] = [];

    // Same shadow-array strategy as singlyReversal:
    // doublyToArray() follows .next pointers which are being mutated
    // mid-loop, so we track the visual list independently.
    //
    // For a doubly reversal the visual effect is identical to singly:
    // each node's value bubbles to the front as its pointers are swapped.
    //
    //   arr    = [10, 20, 30, 40, 50]
    //   i=0  swap → shadow = [10, 20, 30, 40, 50]  (10 already at front)
    //   i=1  swap → shadow = [20, 10, 30, 40, 50]
    //   i=2  swap → shadow = [30, 20, 10, 40, 50]
    //   ...
    //   done → shadow = [50, 40, 30, 20, 10]

    const shadow = [...arr];

    steps.push({
      current: arr[0] ?? null,
      prev: null,
      next: arr[1] ?? null,
      list: [...shadow],
      action: "init",
      newNode: null,
      explanation: "Initialise: curr=head, temp=null",
    });

    for (let i = 0; i < arr.length; i++) {
      const currVal = arr[i];
      const prevVal = i > 0 ? arr[i - 1] : null;
      const nextVal = i + 1 < arr.length ? arr[i + 1] : null;
      const afterNextVal = i + 2 < arr.length ? arr[i + 2] : null;

      // Sub-step 1 — arrive at node, show its current state
      steps.push({
        current: currVal,
        prev: prevVal,
        next: nextVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `Visiting node ${currVal} — curr.prev=${prevVal ?? "null"}, curr.next=${nextVal ?? "null"}`,
      });

      // Sub-step 2 — temp = curr.prev (save old prev before overwriting)
      steps.push({
        current: currVal,
        prev: prevVal,
        next: nextVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `temp = curr.prev → temp is now ${prevVal ?? "null"} (saved so we don't lose the backward link)`,
      });

      // Sub-step 3 — curr.prev = curr.next  (left pointer flips right)
      steps.push({
        current: currVal,
        prev: nextVal,
        next: nextVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `curr.prev = curr.next → node ${currVal}'s ← pointer now aims at ${nextVal ?? "null"} instead of ${prevVal ?? "null"}`,
      });

      // Sub-step 4 — curr.next = temp  (right pointer flips left)
      steps.push({
        current: currVal,
        prev: nextVal,
        next: prevVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `curr.next = temp → node ${currVal}'s → pointer now aims at ${prevVal ?? "null"} instead of ${nextVal ?? "null"}. Both pointers fully swapped ✓`,
      });

      // Update shadow: move currVal to front to reflect the reversal progress
      shadow.splice(i, 1);
      shadow.unshift(currVal);

      // Sub-step 5 — advance curr = curr.prev (which is the old next after swap)
      steps.push({
        current: nextVal ?? null,
        prev: currVal,
        next: afterNextVal,
        list: [...shadow],
        action: "pointer-flipped",
        newNode: null,
        explanation: `curr = curr.prev (the old next) → move to node ${nextVal ?? "null"}. Node ${currVal} is done ✓`,
      });
    }

    steps.push({
      current: null,
      prev: null,
      next: null,
      list: [...shadow],
      action: "complete",
      newNode: null,
      explanation: "Reversal complete — return temp.prev as new head",
    });

    return steps;
  }
}