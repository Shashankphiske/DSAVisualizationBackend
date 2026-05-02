import { describe, it, expect, vi, beforeEach } from "vitest";

// 1. Mock the repository module
vi.mock("../repositories/linkedlist.repository", () => {
    return {
        LinkedListRepository: vi.fn().mockImplementation(function (this: any) {
            this.singlyInsertion = vi.fn();
            this.singlyDeletion = vi.fn();
            this.singlyReversal = vi.fn();
            this.doublyInsertion = vi.fn();
            this.doublyDeletion = vi.fn();
            this.doublyReversal = vi.fn();
        }),
    };
});

// 2. Import service and mocked class
import { LinkedListService } from "../services/linkedlist.service";
import { LinkedListRepository } from "../repositories/linkedlist.repository";

describe("LinkedListService", () => {
    let service: LinkedListService;
    // Capture the singleton instance created at the top of the service file
    const repoMock = vi.mocked(LinkedListRepository).mock.results[0].value;

    beforeEach(() => {
        service = new LinkedListService();
        vi.clearAllMocks();
    });

    const mockArr = [1, 2, 3];
    const mockSteps = [{ current: 1, prev: null, next: 2, list: [1, 2, 3] }];

    describe("Singly Linked List Operations", () => {
        it("should call singlyInsertion with correct params", () => {
            repoMock.singlyInsertion.mockReturnValue(mockSteps);
            const result = service.singlyInsertion(mockArr, 1, 10);

            expect(repoMock.singlyInsertion).toHaveBeenCalledWith(mockArr, 1, 10);
            expect(result).toEqual(mockSteps);
        });

        it("should call singlyDeletion with correct params", () => {
            repoMock.singlyDeletion.mockReturnValue(mockSteps);
            const result = service.singlyDeletion(mockArr, 1);

            expect(repoMock.singlyDeletion).toHaveBeenCalledWith(mockArr, 1);
            expect(result).toBe(mockSteps);
        });

        it("should call singlyReversal with correct params", () => {
            repoMock.singlyReversal.mockReturnValue(mockSteps);
            const result = service.singlyReversal(mockArr);

            expect(repoMock.singlyReversal).toHaveBeenCalledWith(mockArr);
            expect(result).toBe(mockSteps);
        });
    });

    describe("Doubly Linked List Operations", () => {
        it("should call doublyInsertion with correct params", () => {
            repoMock.doublyInsertion.mockReturnValue(mockSteps);
            const result = service.doublyInsertion(mockArr, 0, 5);

            expect(repoMock.doublyInsertion).toHaveBeenCalledWith(mockArr, 0, 5);
            expect(result).toBe(mockSteps);
        });

        it("should call doublyDeletion with correct params", () => {
            repoMock.doublyDeletion.mockReturnValue(mockSteps);
            const result = service.doublyDeletion(mockArr, 2);

            expect(repoMock.doublyDeletion).toHaveBeenCalledWith(mockArr, 2);
            expect(result).toBe(mockSteps);
        });

        it("should call doublyReversal with correct params", () => {
            repoMock.doublyReversal.mockReturnValue(mockSteps);
            const result = service.doublyReversal(mockArr);

            expect(repoMock.doublyReversal).toHaveBeenCalledWith(mockArr);
            expect(result).toBe(mockSteps);
        });
    });
});
