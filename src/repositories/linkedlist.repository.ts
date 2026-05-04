import { LinkedListStep } from "../types";

// node class

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

// ll builders

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


export class LinkedListRepository {

  // singly linked list

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

    const shadow = [...arr];

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

      steps.push({
        current: currVal,
        prev: prevVal,
        next: nextVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `Visiting node ${currVal} — curr.next=${nextVal ?? "null"}, prev=${prevVal ?? "null"}`,
      });

      steps.push({
        current: currVal,
        prev: prevVal,
        next: nextVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `next = curr.next → next saved as ${nextVal ?? "null"} (so we can still advance after overwriting curr.next)`,
      });

      steps.push({
        current: currVal,
        prev: prevVal,
        next: prevVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `curr.next = prev → node ${currVal}'s pointer now aims at ${prevVal ?? "null"} instead of ${nextVal ?? "null"} ✓`,
      });

      shadow.splice(i, 1);
      shadow.unshift(currVal);

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

      steps.push({
        current: currVal,
        prev: prevVal,
        next: nextVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `Visiting node ${currVal} — curr.prev=${prevVal ?? "null"}, curr.next=${nextVal ?? "null"}`,
      });

      steps.push({
        current: currVal,
        prev: prevVal,
        next: nextVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `temp = curr.prev → temp is now ${prevVal ?? "null"} (saved so we don't lose the backward link)`,
      });

      steps.push({
        current: currVal,
        prev: nextVal,
        next: nextVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `curr.prev = curr.next → node ${currVal}'s ← pointer now aims at ${nextVal ?? "null"} instead of ${prevVal ?? "null"}`,
      });

      steps.push({
        current: currVal,
        prev: nextVal,
        next: prevVal,
        list: [...shadow],
        action: "reverse-step",
        newNode: null,
        explanation: `curr.next = temp → node ${currVal}'s → pointer now aims at ${prevVal ?? "null"} instead of ${nextVal ?? "null"}. Both pointers fully swapped ✓`,
      });

      shadow.splice(i, 1);
      shadow.unshift(currVal);

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