import { QueueStep } from "../types";

export class QueueRepository {
  enqueue(queue: number[], toEnqueue: number[]): QueueStep[] {
    const steps: QueueStep[] = [];
    const q = [...queue];

    const addStep = (action: string, current: number | null, prev: number | null, next: number | null, highlight: (number | null)[], list: number[]) => {
      steps.push({ action, pointer: { current, prev, next }, highlight, list: [...list] });
    };

    for (const value of toEnqueue) {
      const prevRear = q.length > 0 ? q[q.length - 1] : null;
      addStep("enqueue-start", value, prevRear, null, [value], q);
      q.push(value);
      addStep("enqueue-complete", null, prevRear, value, [value], q);
    }
    return steps;
  }

  dequeue(queue: number[], dequeueList: number[]): QueueStep[] {
    const steps: QueueStep[] = [];
    const q = [...queue];

    const addStep = (action: string, current: number | null, prev: number | null, next: number | null, highlight: (number | null)[], list: number[]) => {
      steps.push({ action, pointer: { current, prev, next }, highlight, list: [...list] });
    };

    for (const _ of dequeueList) {
      if (q.length === 0) {
        addStep("dequeue-start", null, null, null, [], q);
        addStep("dequeue-complete", null, null, null, [], q);
        continue;
      }
      const front = q[0];
      const newFront = q.length > 1 ? q[1] : null;
      addStep("dequeue-start", front, null, newFront, [front], q);
      q.shift();
      addStep("dequeue-complete", null, null, newFront, [newFront], q);
    }
    return steps;
  }
}
