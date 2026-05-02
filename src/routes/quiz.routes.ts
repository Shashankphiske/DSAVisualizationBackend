import { Router, RequestHandler } from "express";
import { QuizController } from "../controllers/quiz.controller";

const router = Router();
const ctrl = new QuizController();

/**
 * Quiz Routes
 *
 * GET  /quiz/questions             — returns all questions (answer stripped)
 *                                    query params: ?category=sorting&difficulty=beginner
 * POST /quiz/answer                — validates a submitted answer
 *                                    body: { questionId, selectedIndex, timeSpentMs }
 */
router.get("/questions", ctrl.getQuestions.bind(ctrl) as RequestHandler);
router.post("/answer", ctrl.validateAnswer.bind(ctrl) as RequestHandler);

export default router;
