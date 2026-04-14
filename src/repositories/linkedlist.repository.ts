import { LinkedListStep } from "../types";

// Singly Node

class SNode {
  val: number;
  next: SNode | null = null;
  constructor(val: number) { this.val = val; }
}

// Doubly Node

class DNode {
  val: number;
  next: DNode | null = null;
  prev: DNode | null = null;
  constructor(val: number) { this.val = val; }
}

// Helpers

function buildSingly(arr: number[]): { head: SNode | null; tail: SNode | null } {
  let head: SNode | null = null, tail: SNode | null = null;
  for (const v of arr) {
    const node = new SNode(v);
    if (!head) { head = node; tail = node; }
    else { tail!.next = node; tail = node; }
  }
  return { head, tail };
}

function buildDoubly(arr: number[]): { head: DNode | null; tail: DNode | null } {
  let head: DNode | null = null, tail: DNode | null = null;
  for (const v of arr) {
    const node = new DNode(v);
    if (!head) { head = node; tail = node; }
    else { tail!.next = node; node.prev = tail; tail = node; }
  }
  return { head, tail };
}

function singlyToArray(head: SNode | null): number[] {
  const out: number[] = [];
  let t = head;
  while (t) { out.push(t.val); t = t.next; }
  return out;
}

function doublyToArray(head: DNode | null): number[] {
  const out: number[] = [];
  let t = head;
  while (t) { out.push(t.val); t = t.next; }
  return out;
}

// Repository

export class LinkedListRepository {
  singlyInsertion(arr: number[], index: number, value: number): LinkedListStep[] {
    const steps: LinkedListStep[] = [];
    let { head } = buildSingly(arr);

    const getList = () => singlyToArray(head);
    const push = (curr: SNode | null, prev: SNode | null, next: SNode | null) =>
      steps.push({ current: curr?.val ?? null, prev: prev?.val ?? null, next: next?.val ?? null, list: getList() });

    push(null, null, null);
    const newNode = new SNode(value);

    if (index === 0) {
      newNode.next = head;
      head = newNode;
      push(newNode, null, newNode.next);
    } else {
      let prev: SNode | null = null, curr = head, i = 0;
      while (curr !== null && i < index) {
        push(curr, prev, curr.next);
        prev = curr; curr = curr.next; i++;
      }
      newNode.next = curr;
      if (prev) prev.next = newNode;
      push(newNode, prev, curr);
    }
    return steps;
  }

  singlyDeletion(arr: number[], index: number): LinkedListStep[] {
    const steps: LinkedListStep[] = [];
    let { head } = buildSingly(arr);

    const getList = () => singlyToArray(head);
    const push = (curr: SNode | null, prev: SNode | null, next: SNode | null) =>
      steps.push({ current: curr?.val ?? null, prev: prev?.val ?? null, next: next?.val ?? null, list: getList() });

    push(null, null, null);

    if (index === 0) {
      push(head, null, head?.next ?? null);
      head = head?.next ?? null;
      push(null, null, null);
    } else {
      let curr = head, prev: SNode | null = null, i = 0;
      while (curr && i < index) {
        push(curr, prev, curr.next);
        prev = curr; curr = curr.next; i++;
      }
      if (curr && prev) {
        push(curr, prev, curr.next);
        prev.next = curr.next;
        push(null, prev, curr.next);
      }
    }
    return steps;
  }

  singlyReversal(arr: number[]): LinkedListStep[] {
    const steps: LinkedListStep[] = [];
    let { head } = buildSingly(arr);

    const getList = () => singlyToArray(head);
    const push = (curr: SNode | null, prev: SNode | null, next: SNode | null) =>
      steps.push({ current: curr?.val ?? null, prev: prev?.val ?? null, next: next?.val ?? null, list: getList() });

    push(null, null, null);
    let prev: SNode | null = null, curr = head;

    while (curr) {
      const nextNode = curr.next;
      push(curr, prev, nextNode);
      curr.next = prev;
      prev = curr; curr = nextNode;
      push(prev, null, curr);
    }
    head = prev;
    push(null, null, null);
    return steps;
  }

  doublyInsertion(arr: number[], index: number, value: number): LinkedListStep[] {
    const steps: LinkedListStep[] = [];
    let { head } = buildDoubly(arr);

    const getList = () => doublyToArray(head);
    const push = (curr: DNode | null, prev: DNode | null, next: DNode | null) =>
      steps.push({ current: curr?.val ?? null, prev: prev?.val ?? null, next: next?.val ?? null, list: getList() });

    push(null, null, null);
    const newNode = new DNode(value);

    if (index === 0) {
      newNode.next = head;
      if (head) head.prev = newNode;
      head = newNode;
      push(newNode, null, newNode.next);
    } else {
      let curr = head, prev: DNode | null = null, i = 0;
      while (curr && i < index) {
        push(curr, prev, curr.next);
        prev = curr; curr = curr.next; i++;
      }
      newNode.next = curr;
      newNode.prev = prev;
      if (prev) prev.next = newNode;
      if (curr) curr.prev = newNode;
      push(newNode, prev, curr);
    }
    return steps;
  }

  doublyDeletion(arr: number[], index: number): LinkedListStep[] {
    const steps: LinkedListStep[] = [];
    let { head } = buildDoubly(arr);

    const getList = () => doublyToArray(head);
    const push = (curr: DNode | null, prev: DNode | null, next: DNode | null) =>
      steps.push({ current: curr?.val ?? null, prev: prev?.val ?? null, next: next?.val ?? null, list: getList() });

    push(null, null, null);

    if (index === 0) {
      push(head, null, head?.next ?? null);
      const nextNode = head?.next ?? null;
      if (nextNode) nextNode.prev = null;
      head = nextNode;
      push(null, null, head);
    } else {
      let curr = head, prev: DNode | null = null, i = 0;
      while (curr && i < index) {
        push(curr, prev, curr.next);
        prev = curr; curr = curr.next; i++;
      }
      if (curr) {
        push(curr, prev, curr.next);
        const nextNode = curr.next;
        if (prev) prev.next = nextNode;
        if (nextNode) nextNode.prev = prev;
        push(null, prev, nextNode);
      }
    }
    return steps;
  }

  doublyReversal(arr: number[]): LinkedListStep[] {
    const steps: LinkedListStep[] = [];
    let { head } = buildDoubly(arr);

    const getList = () => doublyToArray(head);
    const push = (curr: DNode | null, prev: DNode | null, next: DNode | null) =>
      steps.push({ current: curr?.val ?? null, prev: prev?.val ?? null, next: next?.val ?? null, list: getList() });

    push(null, null, null);
    let curr: DNode | null = head;
    let temp: DNode | null = null;

    while (curr) {
      const nextNode = curr.next;
      const prevNode = curr.prev;
      push(curr, prevNode, nextNode);

      temp = curr.prev;
      curr.prev = curr.next;
      curr.next = temp;
      push(curr, curr.prev, curr.next);

      curr = curr.prev;
    }
    if (temp) head = temp.prev;
    push(null, null, null);
    return steps;
  }
}
