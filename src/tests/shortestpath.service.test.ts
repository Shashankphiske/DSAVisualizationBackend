import { describe, it, expect, vi, beforeEach } from "vitest";

// 1. Mock the repository module
vi.mock("../repositories/shortestpath.repository", () => {
    return {
        ShortestPathRepository: vi.fn().mockImplementation(function (this: any) {
            this.dijkstra = vi.fn();
            this.aStar = vi.fn();
        }),
    };
});

// 2. Import after the mock
import { ShortestPathService } from "../services/shortestpath.service";
import { ShortestPathRepository } from "../repositories/shortestpath.repository";

describe("ShortestPathService", () => {
    let service: ShortestPathService;
    // Capture singleton instance
    const repoMock = vi.mocked(ShortestPathRepository).mock.results[0].value;

    beforeEach(() => {
        service = new ShortestPathService();
        vi.clearAllMocks();
    });

    const mockAdj = {
        A: { B: 1 },
        B: { A: 1 }
    };
    const mockAdjStr = JSON.stringify(mockAdj);

    describe("dijkstra", () => {
        it("should call repo.dijkstra when passed a valid object", () => {
            repoMock.dijkstra.mockReturnValue([{ currentNode: "A", found: true }]);
            const result = service.dijkstra(mockAdj, "A", "B");

            expect(repoMock.dijkstra).toHaveBeenCalledWith(mockAdj, "A", "B");
            expect(result[0].found).toBe(true);
        });

        it("should parse string input and call repo.dijkstra", () => {
            repoMock.dijkstra.mockReturnValue([]);
            service.dijkstra(mockAdjStr, "A", "B");

            expect(repoMock.dijkstra).toHaveBeenCalledWith(mockAdj, "A", "B");
        });

        it("should throw error if start or end node is missing in adjacency list", () => {
            expect(() => service.dijkstra(mockAdj, "Z", "B")).toThrow("Start or end node not found");
        });

        it("should throw error for missing basic inputs", () => {
            // @ts-expect-error
            expect(() => service.dijkstra(null, "", "")).toThrow("Invalid input");
        });
    });

    describe("aStar", () => {
        const mockHeuristic = { A: 0, B: 0 };
        const mockHeuristicStr = JSON.stringify(mockHeuristic);

        it("should call repo.aStar with parsed adjacency and heuristic", () => {
            repoMock.aStar.mockReturnValue([{ currentNode: "A", found: false }]);

            const result = service.aStar(mockAdjStr, "A", "B", mockHeuristicStr);

            expect(repoMock.aStar).toHaveBeenCalledWith(mockAdj, "A", "B", mockHeuristic);
            expect(result).toBeInstanceOf(Array);
        });

        it("should use empty object if heuristic is not provided", () => {
            service.aStar(mockAdj, "A", "B");
            expect(repoMock.aStar).toHaveBeenCalledWith(mockAdj, "A", "B", {});
        });

        it("should throw error if adjacency list is string but invalid JSON", () => {
            expect(() => service.aStar("{invalid}", "A", "B")).toThrow();
        });
    });
});
