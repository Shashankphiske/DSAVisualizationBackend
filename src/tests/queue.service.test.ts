import { describe, it, expect, vi, beforeEach } from "vitest";

// 1. Mock the repository module
vi.mock("../repositories/queue.repository", () => {
    return {
        QueueRepository: vi.fn().mockImplementation(function (this: any) {
            this.enqueue = vi.fn();
            this.dequeue = vi.fn();
        }),
    };
});

// 2. Import service and mocked class
import { QueueService } from "../services/queue.service";
import { QueueRepository } from "../repositories/queue.repository";

describe("QueueService", () => {
    let service: QueueService;
    // Capture the singleton instance created at the top level of the service file
    const repoMock = vi.mocked(QueueRepository).mock.results[0].value;

    beforeEach(() => {
        service = new QueueService();
        vi.clearAllMocks();
    });

    const mockQueue = [10, 20];
    const mockSteps = [
        { action: "enqueue-start", pointer: { current: 30, prev: 20, next: null }, highlight: [30], list: [10, 20] }
    ];

    describe("enqueue", () => {
        it("should call repo.enqueue with correct parameters", () => {
            repoMock.enqueue.mockReturnValue(mockSteps);
            const toEnqueue = [30];

            const result = service.enqueue(mockQueue, toEnqueue);

            expect(repoMock.enqueue).toHaveBeenCalledWith(mockQueue, toEnqueue);
            expect(result).toEqual(mockSteps);
        });
    });

    describe("dequeue", () => {
        it("should call repo.dequeue with correct parameters", () => {
            repoMock.dequeue.mockReturnValue(mockSteps);
            const dequeueList = [1]; // Representing number of elements to dequeue

            const result = service.dequeue(mockQueue, dequeueList);

            expect(repoMock.dequeue).toHaveBeenCalledWith(mockQueue, dequeueList);
            expect(result).toBe(mockSteps);
        });
    });
});
