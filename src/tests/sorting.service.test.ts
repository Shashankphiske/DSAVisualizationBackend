import { describe, it, expect, vi, beforeEach } from "vitest";

// 1. Mock the repository module
vi.mock("../repositories/sorting.repository", () => {
    return {
        SortingRepository: vi.fn().mockImplementation(function (this: any) {
            this.bubbleSort = vi.fn();
            this.selectionSort = vi.fn();
            this.insertionSort = vi.fn();
            this.mergeSort = vi.fn();
            this.quickSort = vi.fn();
            this.heapSort = vi.fn();
        }),
    };
});

// 2. Import after the mock
import { SortingService } from "../services/sorting.service";
import { SortingRepository } from "../repositories/sorting.repository";

describe("SortingService", () => {
    let service: SortingService;
    // Capture the singleton instance created at the top level
    const repoMock = vi.mocked(SortingRepository).mock.results[0].value;

    beforeEach(() => {
        service = new SortingService();
        vi.clearAllMocks();
    });

    const mockArr = [3, 1, 2];
    const mockRaw = JSON.stringify(mockArr);
    const mockSteps = [{ arr: [1, 2, 3], comparing: [], swapped: false }];

    // Parameterized test for all sorting methods
    const sortMethods = [
        "bubbleSort",
        "selectionSort",
        "insertionSort",
        "mergeSort",
        "quickSort",
        "heapSort",
    ] as const;

    describe.each(sortMethods)("%s", (method) => {
        it(`should parse JSON and call repo.${method}`, () => {
            repoMock[method].mockReturnValue(mockSteps);

            const result = service[method](mockRaw);

            expect(repoMock[method]).toHaveBeenCalledWith(mockArr);
            expect(result).toEqual(mockSteps);
        });

        it("should throw an error if JSON parsing fails", () => {
            expect(() => service[method]("invalid-json")).toThrow();
        });
    });
});
