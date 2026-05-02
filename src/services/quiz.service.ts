import { logger } from "../logger/logger";
import { QuizRepository } from "../repositories/quiz.repository";
import { QuizAnswerPayload, QuizAnswerResult } from "../types";

const repo = new QuizRepository();

/**
 * QuizService
 *
 * Implements the prediction-challenge assessment module described
 * in Section X of the IEEE paper. The service exposes three
 * operations:
 *   1. getQuestions  — retrieve questions filtered by category/difficulty
 *   2. validateAnswer — check a submitted answer and return feedback
 *   3. getExplanation — return the post-answer explanation for a question
 *
 * Answer validation is intentionally stateless: the client tracks
 * session score locally and syncs to the UserController endpoint.
 * This keeps the quiz service pure and independently testable.
 */
export class QuizService {

  getQuestions(category?: string, difficulty?: string) {
    let questions = repo.findAll();

    if (category) {
      questions = questions.filter(q => q.dsaCategory === category);
    }
    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    // Strip the correct answer before sending to client
    const sanitised = questions.map(({ correctIndex: _, explanation: __, ...rest }) => rest);

    logger.info("Quiz: questions fetched", { count: sanitised.length, category, difficulty });
    return sanitised;
  }

  validateAnswer(payload: QuizAnswerPayload): QuizAnswerResult {
    const { questionId, selectedIndex, timeSpentMs } = payload;

    const question = repo.findById(questionId);
    if (!question) {
      logger.warn("Quiz: question not found", { questionId });
      throw new Error(`Question with id ${questionId} not found`);
    }

    const correct = selectedIndex === question.correctIndex;

    logger.info("Quiz: answer submitted", {
      questionId,
      correct,
      timeSpentMs,
    });

    return {
      questionId,
      correct,
      correctIndex: question.correctIndex,
      explanation: question.explanation,
    };
  }
}
