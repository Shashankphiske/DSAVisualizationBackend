import { Request, Response } from "express";
import { QuizService } from "../services/quiz.service";
import { QuizAnswerPayload } from "../types";
import { logger } from "../logger/logger";

const service = new QuizService();

export class QuizController {

  getQuestions(req: Request, res: Response): void {
    try {
      logger.http("GET /quiz/questions", { ip: req.ip });
      const { category, difficulty } = req.query as { category?: string; difficulty?: string };
      const questions = service.getQuestions(category, difficulty);
      res.status(200).json({ message: "success", questions });
    } catch (err: unknown) {
      res.status(500).json({ message: err instanceof Error ? err.message : "Server error" });
    }
  }

  validateAnswer(req: Request, res: Response): void {
    try {
      logger.http("POST /quiz/answer", { ip: req.ip });
      const payload = req.body as QuizAnswerPayload;

      if (
        typeof payload.questionId !== "number" ||
        typeof payload.selectedIndex !== "number" ||
        typeof payload.timeSpentMs !== "number"
      ) {
        res.status(400).json({ message: "Request body must include questionId, selectedIndex, and timeSpentMs (all numbers)" });
        return;
      }

      const result = service.validateAnswer(payload);
      res.status(200).json({ message: "success", result });
    } catch (err: unknown) {
      const status = err instanceof Error && err.message.includes("not found") ? 404 : 400;
      res.status(status).json({ message: err instanceof Error ? err.message : "Invalid input" });
    }
  }
}
