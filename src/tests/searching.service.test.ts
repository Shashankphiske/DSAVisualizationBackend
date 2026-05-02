import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../repositories/searching.repository", () => ({
  SearchingRepository: vi.fn().mockImplementation(function (this: any) {
    this.linearSearch = vi.fn();
    this.binarySearch = vi.fn();
  }),
}));

import { SearchingService } from "../services/searching.service";
import { SearchingRepository } from "../repositories/searching.repository";

describe("SearchingService", () => {
  let service: SearchingService;
  const repoMock = vi.mocked(SearchingRepository).mock.results[0].value;
  const arr = [10, 20, 30, 40];
  const raw = JSON.stringify(arr);

  beforeEach(() => {
    service = new SearchingService();
    vi.clearAllMocks();
  });

  describe("linearSearch", () => {
    it("calls repository with parsed array and target", () => {
      repoMock.linearSearch.mockReturnValue([{ arr, found: true, index: 2, eliminated: [], explanation: "" }]);
      const result = service.linearSearch(raw, 30);
      expect(repoMock.linearSearch).toHaveBeenCalledWith(arr, 30);
      expect(result[0].index).toBe(2);
    });

    it("throws on invalid JSON", () => {
      expect(() => service.linearSearch("bad", 1)).toThrow();
    });
  });

  describe("binarySearch", () => {
    it("calls repository and returns steps", () => {
      const mockSteps = [{ arr, left: 0, right: 3, mid: 1, found: false, eliminated: [], explanation: "" }];
      repoMock.binarySearch.mockReturnValue(mockSteps);
      const result = service.binarySearch(raw, 40);
      expect(repoMock.binarySearch).toHaveBeenCalledWith(arr, 40);
      expect(result).toEqual(mockSteps);
    });

    it("handles empty array", () => {
      repoMock.binarySearch.mockReturnValue([]);
      const result = service.binarySearch("[]", 5);
      expect(result).toEqual([]);
    });
  });
});
