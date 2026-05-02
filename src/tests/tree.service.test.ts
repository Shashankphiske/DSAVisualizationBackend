import { describe, it, expect, vi, beforeEach } from "vitest";

// 1. Mock the repository module
vi.mock("../repositories/tree.repository", () => {
    return {
        TreeRepository: vi.fn().mockImplementation(function (this: any) {
            this.inorder = vi.fn();
            this.preorder = vi.fn();
            this.postorder = vi.fn();
        }),
    };
});

// 2. Import service and mocked class
import { TreeService } from "../services/tree.service";
import { TreeRepository } from "../repositories/tree.repository";

describe("TreeService", () => {
    let service: TreeService;
    // Capture singleton instance from the top-level repo constant
    const repoMock = vi.mocked(TreeRepository).mock.results[0].value;

    beforeEach(() => {
        service = new TreeService();
        vi.clearAllMocks();
    });

    const mockAdj = {
        A: ["B", "C"],
        B: [null, null],
        C: [null, null],
    };

    describe("Validation Logic", () => {
        it("should throw error if adjacency list is null or not an object", () => {
            expect(() => service.inorder(null)).toThrow("Invalid adjacency list");
            expect(() => service.preorder(undefined)).toThrow("Invalid adjacency list");
            expect(() => service.postorder("not-an-object")).toThrow("Invalid adjacency list");
        });
    });

    describe("Traversal Methods", () => {
        it("should call repo.inorder with valid adjacency list", () => {
            repoMock.inorder.mockReturnValue(["B", "A", "C"]);
            const result = service.inorder(mockAdj);

            expect(repoMock.inorder).toHaveBeenCalledWith(mockAdj);
            expect(result).toEqual(["B", "A", "C"]);
        });

        it("should call repo.preorder with valid adjacency list", () => {
            repoMock.preorder.mockReturnValue(["A", "B", "C"]);
            const result = service.preorder(mockAdj);

            expect(repoMock.preorder).toHaveBeenCalledWith(mockAdj);
            expect(result).toEqual(["A", "B", "C"]);
        });

        it("should call repo.postorder with valid adjacency list", () => {
            repoMock.postorder.mockReturnValue(["B", "C", "A"]);
            const result = service.postorder(mockAdj);

            expect(repoMock.postorder).toHaveBeenCalledWith(mockAdj);
            expect(result).toEqual(["B", "C", "A"]);
        });
    });
});
