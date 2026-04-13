import { StackStep } from "../types";

export class StackRepository {
  push(stack: number[], toPush: number[]): StackStep[] {
    const steps: StackStep[] = [];
    const s = [...stack];

    const addStep = (action: string, current: number | null, prev: number | null, next: number | null, highlight: (number | null)[], list: number[]) => {
      steps.push({ action, pointer: { current, prev, next }, highlight, list: [...list] });
    };

    for (const value of toPush) {
      const prevTop = s.length > 0 ? s[s.length - 1] : null;
      addStep("push-start", value, prevTop, null, [value], s);
      s.push(value);
      addStep("push-complete", null, prevTop, value, [value], s);
    }
    return steps;
  }

  pop(stack: number[], popCount: number): StackStep[] {
    const steps: StackStep[] = [];
    const s = [...stack];

    const addStep = (action: string, current: number | null, prev: number | null, next: number | null, highlight: (number | null)[], list: number[]) => {
      steps.push({ action, pointer: { current, prev, next }, highlight, list: [...list] });
    };

    for (let i = 0; i < popCount; i++) {
      if (s.length === 0) {
        addStep("pop-start", null, null, null, [], s);
        addStep("pop-complete", null, null, null, [], s);
        continue;
      }
      const currentTop = s[s.length - 1];
      const newTop = s.length > 1 ? s[s.length - 2] : null;
      addStep("pop-start", currentTop, newTop, null, [currentTop], s);
      s.pop();
      addStep("pop-complete", null, newTop, null, [newTop], s);
    }
    return steps;
  }
}
