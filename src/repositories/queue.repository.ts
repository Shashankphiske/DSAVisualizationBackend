import { QueueStep } from "../types";

export class QueueRepository {

  enqueue(queue: number[], toEnqueue: number[]): QueueStep[] {
    const steps: QueueStep[] = [];
    const q = [...queue];

    for (const value of toEnqueue) {
      const prevRear = q.length > 0 ? q[q.length - 1] : null;

      steps.push({
        action: "enqueue-start",
        pointer: { current: value, prev: prevRear, next: null },
        highlight: [value],
        list: [...q],
        explanation: `Enqueuing ${value} at rear (current rear: ${prevRear ?? "empty"})`,
      });

      q.push(value);

      steps.push({
        action: "enqueue-complete",
        pointer: { current: null, prev: prevRear, next: value },
        highlight: [value],
        list: [...q],
        explanation: `${value} added to rear of queue`,
      });
    }

    return steps;
  }

  dequeue(queue: number[], count: number): QueueStep[] {
    const steps: QueueStep[] = [];
    const q = [...queue];

    for (let i = 0; i < count; i++) {
      if (q.length === 0) {
        steps.push({
          action: "underflow",
          pointer: { current: null, prev: null, next: null },
          highlight: [],
          list: [...q],
          explanation: "Queue underflow — cannot dequeue from an empty queue",
        });
        break;
      }

      const front = q[0];
      const newFront = q.length > 1 ? q[1] : null;

      steps.push({
        action: "dequeue-start",
        pointer: { current: front, prev: null, next: newFront },
        highlight: [front],
        list: [...q],
        explanation: `Dequeuing front element ${front}`,
      });

      q.shift();

      steps.push({
        action: "dequeue-complete",
        pointer: { current: null, prev: null, next: newFront },
        highlight: [newFront],
        list: [...q],
        explanation: `${front} removed — new front: ${newFront ?? "queue is now empty"}`,
      });
    }

    return steps;
  }
}
