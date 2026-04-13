import { describe, it, expect, vi, beforeEach } from "vitest";

// 1. Mock the repository module
vi.mock("../repositories/searching.repository", () => {
    return {
        SearchingRepository: vi.fn().mockImplementation(function (this: any) {
            this.linearSearch = vi.fn();
            this.binarySearch = vi.fn();
        }),
    };
});

// 2. Import service and mocked class
import { SearchingService } from "../services/searching.service";
import { SearchingRepository } from "../repositories/searching.repository";

describe("SearchingService", () => {
    let service: SearchingService;
    // Capture the singleton instance created at the top level
    const repoMock = vi.mocked(SearchingRepository).mock.results[0].value;

    beforeEach(() => {
        service = new SearchingService();
        vi.clearAllMocks();
    });

    const mockRawData = "[10, 20, 30, 40]";
    const parsedData = [10, 20, 30, 40];

    describe("linearSearch", () => {
        it("should parse the raw string and call repo.linearSearch", () => {
            repoMock.linearSearch.mockReturnValue([{ arr: parsedData, found: true, index: 2 }]);

            const result = service.linearSearch(mockRawData, 30);

            // Verify parsing logic
            expect(repoMock.linearSearch).toHaveBeenCalledWith(parsedData, 30);
            expect(result[0].index).toBe(2);
        });

        it("should throw an error if JSON parsing fails", () => {
            expect(() => service.linearSearch("invalid-json", 10)).toThrow();
        });
    });

    describe("binarySearch", () => {
        it("should parse the raw string and call repo.binarySearch", () => {
            const mockBinarySteps = [{ arr: parsedData, left: 0, right: 3, mid: 1, found: false }];
            repoMock.binarySearch.mockReturnValue(mockBinarySteps);

            const result = service.binarySearch(mockRawData, 40);

            expect(repoMock.binarySearch).toHaveBeenCalledWith(parsedData, 40);
            expect(result).toEqual(mockBinarySteps);
        });

        it("should handle empty arrays correctly through parsing", () => {
            repoMock.binarySearch.mockReturnValue([]);
            const result = service.binarySearch("[]", 5);

            expect(repoMock.binarySearch).toHaveBeenCalledWith([], 5);
            expect(result).toEqual([]);
        });
    });
});
