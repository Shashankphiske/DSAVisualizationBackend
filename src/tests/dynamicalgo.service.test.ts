import { describe, it, expect, vi, beforeEach } from "vitest";

// 1. Mock the repository using a standard function (not an arrow function)
vi.mock("../repositories/dynamicalgo.repository", () => {
    return {
        DynamicAlgoRepository: vi.fn().mockImplementation(function (this: any) {
            this.fibonacci = vi.fn();
            this.coinChange = vi.fn();
            this.lcs = vi.fn();
        }),
    };
});

// 2. Import after the mock
import { DynamicAlgoService } from "../services/dynamicalgo.service";
import { DynamicAlgoRepository } from "../repositories/dynamicalgo.repository";

describe("DynamicAlgoService", () => {
    let service: DynamicAlgoService;
    const repoMock = vi.mocked(DynamicAlgoRepository).mock.results[0].value;

    beforeEach(() => {
        service = new DynamicAlgoService();
        vi.clearAllMocks();
    });


    describe("fibonacci", () => {
        it("should call repo and return value", () => {
            repoMock.fibonacci.mockReturnValue(55);
            const result = service.fibonacci(10);

            expect(repoMock.fibonacci).toHaveBeenCalledWith(10);
            expect(result).toBe(55);
        });

        it("should throw for invalid range", () => {
            expect(() => service.fibonacci(51)).toThrow(/Invalid input/);
        });
    });

    describe("coinChange", () => {
        it("should call repo with correct args", () => {
            repoMock.coinChange.mockReturnValue(3);
            const result = service.coinChange([1, 2, 5], 11);

            expect(repoMock.coinChange).toHaveBeenCalledWith([1, 2, 5], 11);
            expect(result).toBe(3);
        });
    });

    describe("lcs", () => {
        it("should call repo with strings", () => {
            repoMock.lcs.mockReturnValue(3);
            const result = service.lcs("abc", "ace");

            expect(repoMock.lcs).toHaveBeenCalledWith("abc", "ace");
            expect(result).toBe(3);
        });
    });
});
