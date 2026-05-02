import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../repositories/quiz.repository", () => ({
  QuizRepository: vi.fn().mockImplementation(function (this: any) {
    this.findAll = vi.fn().mockReturnValue([
      {
        id: 1,
        dsaCategory: "sorting",
        difficulty: "beginner",
        question: "Test question",
        options: ["A", "B", "C", "D"],
        correctIndex: 0,
        explanation: "Because A is correct.",
      },
    ]);
    this.findById = vi.fn().mockImplementation((id: number) =>
      id === 1
        ? { id: 1, dsaCategory: "sorting", difficulty: "beginner", question: "Test question", options: ["A","B","C","D"], correctIndex: 0, explanation: "Because A is correct." }
        : undefined
    );
    this.findByCategory = vi.fn().mockReturnValue([]);
    this.findByDifficulty = vi.fn().mockReturnValue([]);
  }),
}));

import { QuizService } from "../services/quiz.service";

describe("QuizService", () => {
  let service: QuizService;

  beforeEach(() => {
    service = new QuizService();
    vi.clearAllMocks();
  });

  describe("getQuestions", () => {
    it("returns questions without correctIndex or explanation", () => {
      const questions = service.getQuestions();
      expect(questions).toHaveLength(1);
      expect(questions[0]).not.toHaveProperty("correctIndex");
      expect(questions[0]).not.toHaveProperty("explanation");
    });
  });

  describe("validateAnswer", () => {
    it("returns correct=true for the right answer", () => {
      const result = service.validateAnswer({ questionId: 1, selectedIndex: 0, timeSpentMs: 1200 });
      expect(result.correct).toBe(true);
      expect(result.correctIndex).toBe(0);
      expect(result.explanation).toBeTruthy();
    });

    it("returns correct=false for the wrong answer", () => {
      const result = service.validateAnswer({ questionId: 1, selectedIndex: 2, timeSpentMs: 800 });
      expect(result.correct).toBe(false);
    });

    it("throws when question id is not found", () => {
      expect(() => service.validateAnswer({ questionId: 999, selectedIndex: 0, timeSpentMs: 0 })).toThrow("not found");
    });
  });
});
