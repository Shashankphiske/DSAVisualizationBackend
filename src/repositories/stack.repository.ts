import { StackStep } from "../types";

export class StackRepository {

  push(stack: number[], toPush: number[]): StackStep[] {
    const steps: StackStep[] = [];
    const s = [...stack];

    for (const value of toPush) {
      const prevTop = s.length > 0 ? s[s.length - 1] : null;

      steps.push({
        action: "push-start",
        pointer: { current: value, prev: prevTop, next: null },
        highlight: [value],
        list: [...s],
        explanation: `Pushing ${value} onto stack (current top: ${prevTop ?? "empty"})`,
      });

      s.push(value);

      steps.push({
        action: "push-complete",
        pointer: { current: null, prev: prevTop, next: value },
        highlight: [value],
        list: [...s],
        explanation: `${value} pushed — new top of stack`,
      });
    }

    return steps;
  }

  pop(stack: number[], popCount: number): StackStep[] {
    const steps: StackStep[] = [];
    const s = [...stack];

    for (let i = 0; i < popCount; i++) {
      if (s.length === 0) {
        steps.push({
          action: "underflow",
          pointer: { current: null, prev: null, next: null },
          highlight: [],
          list: [...s],
          explanation: "Stack underflow — cannot pop from an empty stack",
        });
        break;
      }

      const currentTop = s[s.length - 1];
      const newTop = s.length > 1 ? s[s.length - 2] : null;

      steps.push({
        action: "pop-start",
        pointer: { current: currentTop, prev: newTop, next: null },
        highlight: [currentTop],
        list: [...s],
        explanation: `Popping top element ${currentTop}`,
      });

      s.pop();

      steps.push({
        action: "pop-complete",
        pointer: { current: null, prev: newTop, next: null },
        highlight: [newTop],
        list: [...s],
        explanation: `${currentTop} removed — new top: ${newTop ?? "stack is now empty"}`,
      });
    }

    return steps;
  }
}
