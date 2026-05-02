import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../repositories/stack.repository", () => ({
  StackRepository: vi.fn().mockImplementation(function (this: any) {
    this.push = vi.fn();
    this.pop  = vi.fn();
  }),
}));

import { StackService } from "../services/stack.service";
import { StackRepository } from "../repositories/stack.repository";

describe("StackService", () => {
  let service: StackService;
  const repoMock = vi.mocked(StackRepository).mock.results[0].value;
  const stack = [10, 20];
  const mockStep = { action: "push-complete" as const, pointer: { current: null, prev: 20, next: 30 }, highlight: [30], list: [10, 20, 30], explanation: "30 pushed" };

  beforeEach(() => {
    service = new StackService();
    vi.clearAllMocks();
  });

  describe("push", () => {
    it("calls repo.push with correct arguments", () => {
      repoMock.push.mockReturnValue([mockStep]);
      const result = service.push(stack, [30]);
      expect(repoMock.push).toHaveBeenCalledWith(stack, [30]);
      expect(result).toEqual([mockStep]);
    });

    it("throws when stack is not an array", () => {
      // @ts-expect-error
      expect(() => service.push(null, [1])).toThrow("Invalid input");
    });
  });

  describe("pop", () => {
    it("calls repo.pop with correct arguments", () => {
      repoMock.pop.mockReturnValue([mockStep]);
      const result = service.pop(stack, 1);
      expect(repoMock.pop).toHaveBeenCalledWith(stack, 1);
      expect(result).toEqual([mockStep]);
    });

    it("throws when popCount is not a positive number", () => {
      // @ts-expect-error
      expect(() => service.pop(stack, "2")).toThrow("Invalid input");
      expect(() => service.pop(stack, 0)).toThrow("Invalid input");
    });
  });
});
