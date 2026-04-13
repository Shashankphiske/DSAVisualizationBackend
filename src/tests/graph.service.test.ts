import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../repositories/graph.repository", () => {
    return {
        GraphRepository: vi.fn().mockImplementation(function (this: any) {
            this.bfs = vi.fn();
            this.dfs = vi.fn();
        }),
    };
});

import { GraphService } from "../services/graph.service";
import { GraphRepository } from "../repositories/graph.repository";

describe("GraphService", () => {
    let service: GraphService;

    const repoMock = vi.mocked(GraphRepository).mock.results[0].value;

    beforeEach(() => {
        service = new GraphService();
        vi.clearAllMocks();
    });

    const mockAdjList = { A: ["B"], B: [] };

    describe("bfs", () => {
        it("should call repo.bfs and return steps array", () => {
            const mockSteps = [{ num: "A", neighbours: ["B"], queue: ["A"], found: true }];
            repoMock.bfs.mockReturnValue(mockSteps);

            const result = service.bfs(mockAdjList, "A", "B");

            expect(repoMock.bfs).toHaveBeenCalledWith(mockAdjList, "A", "B");

            expect(result[result.length - 1].found).toBe(true);
        });

        it("should throw error if root node is not in adjList", () => {
            expect(() => service.bfs(mockAdjList, "Z", "A")).toThrow("Root node not found");
        });
    });

    describe("dfs", () => {
        it("should call repo.dfs and return steps array", () => {
            const mockSteps = [{ current: "A", neighbours: ["B"], stack: ["A"], found: true }];
            repoMock.dfs.mockReturnValue(mockSteps);

            const result = service.dfs(mockAdjList, "A", "B");

            expect(repoMock.dfs).toHaveBeenCalledWith(mockAdjList, "A", "B");
            expect(result[0].current).toBe("A");
        });

        it("should throw error for invalid input types", () => {
            // @ts-expect-error
            expect(() => service.dfs(null, "A", "B")).toThrow("Invalid input");
        });
    });
});
