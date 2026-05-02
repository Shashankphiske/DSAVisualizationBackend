import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../repositories/sorting.repository", () => ({
  SortingRepository: vi.fn().mockImplementation(function (this: any) {
    this.bubbleSort    = vi.fn();
    this.selectionSort = vi.fn();
    this.insertionSort = vi.fn();
    this.mergeSort     = vi.fn();
    this.quickSort     = vi.fn();
    this.heapSort      = vi.fn();
  }),
}));

import { SortingService } from "../services/sorting.service";
import { SortingRepository } from "../repositories/sorting.repository";

describe("SortingService", () => {
  let service: SortingService;
  const repoMock = vi.mocked(SortingRepository).mock.results[0].value;

  beforeEach(() => {
    service = new SortingService();
    vi.clearAllMocks();
  });

  const validArr  = [3, 1, 2];
  const validRaw  = JSON.stringify(validArr);
  const mockSteps = [{ arr: [1, 2, 3], comparing: [], swapped: false, sorted: [], explanation: "done" }];

  const methods = ["bubbleSort", "selectionSort", "insertionSort", "mergeSort", "quickSort", "heapSort"] as const;

  describe.each(methods)("%s", (method) => {
    it("parses valid JSON array and calls repository", () => {
      repoMock[method].mockReturnValue(mockSteps);
      const result = service[method](validRaw);
      expect(repoMock[method]).toHaveBeenCalledWith(validArr);
      expect(result).toEqual(mockSteps);
    });

    it("throws on malformed JSON", () => {
      expect(() => service[method]("not-json")).toThrow();
    });

    it("throws when input is not an array", () => {
      expect(() => service[method]("42")).toThrow();
    });

    it("throws when array has fewer than 2 elements", () => {
      expect(() => service[method]("[1]")).toThrow();
    });

    it("throws when array exceeds 20 elements", () => {
      const big = JSON.stringify(Array.from({ length: 21 }, (_, i) => i));
      expect(() => service[method](big)).toThrow();
    });
  });
});
