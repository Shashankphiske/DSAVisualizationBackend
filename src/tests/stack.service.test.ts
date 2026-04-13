import { describe, it, expect, vi, beforeEach } from "vitest";

// 1. Mock the repository module
vi.mock("../repositories/stack.repository", () => {
    return {
        StackRepository: vi.fn().mockImplementation(function (this: any) {
            this.push = vi.fn();
            this.pop = vi.fn();
        }),
    };
});

// 2. Import service and mocked class after mock setup
import { StackService } from "../services/stack.service";
import { StackRepository } from "../repositories/stack.repository";

describe("StackService", () => {
    let service: StackService;
    // Capture the singleton instance created at the top level of the service file
    const repoMock = vi.mocked(StackRepository).mock.results[0].value;

    beforeEach(() => {
        service = new StackService();
        vi.clearAllMocks();
    });

    const mockStack = [10, 20];
    const mockSteps = [
        { action: "push-start", pointer: { current: 30, prev: 20, next: null }, highlight: [30], list: [10, 20] }
    ];

    describe("push", () => {
        it("should call repo.push with correct parameters", () => {
            repoMock.push.mockReturnValue(mockSteps);
            const toPush = [30];

            const result = service.push(mockStack, toPush);

            expect(repoMock.push).toHaveBeenCalledWith(mockStack, toPush);
            expect(result).toEqual(mockSteps);
        });
    });

    describe("pop", () => {
        it("should call repo.pop with correct parameters", () => {
            repoMock.pop.mockReturnValue(mockSteps);
            const popCount = 1;

            const result = service.pop(mockStack, popCount);

            expect(repoMock.pop).toHaveBeenCalledWith(mockStack, popCount);
            expect(result).toBe(mockSteps);
        });

        it("should throw error for invalid input types", () => {
            // @ts-expect-error - testing runtime validation
            expect(() => service.pop(null, "1")).toThrow("Invalid input");
        });
    });
});
