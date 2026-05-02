import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import sortingRoutes from "../routes/sorting.routes";
import searchingRoutes from "../routes/searching.routes";
import graphRoutes from "../routes/graph.routes";
import shortestPathRoutes from "../routes/shortestpath.routes";
import treeRoutes from "../routes/tree.routes";
import linkedListRoutes from "../routes/linkedlist.routes";
import stackRoutes from "../routes/stack.routes";
import queueRoutes from "../routes/queue.routes";
import dynamicAlgoRoutes from "../routes/dynamicalgo.routes";
import quizRoutes from "../routes/quiz.routes";
import { UserRouter } from "../routes/user.routes";

import { SheetsController } from "../controllers/sheets.controller";
import { logger } from "../logger/logger";
import { cacheMiddleware } from "../middleware/redis.middleware";

const sheetsCtrl = new SheetsController();

/**
 * Rate limiter: 50 requests per minute per IP.
 * Prevents abuse of the step-generation endpoints while
 * comfortably accommodating normal classroom usage.
 */
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: { message: "Too many requests — please wait before retrying" },
  standardHeaders: true,
  legacyHeaders: false,
});

const morganStream = {
  write: (message: string) => logger.info(message.trim()),
};

export function createApp(): Application {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(limiter);
  app.use(morgan(":method :url :status :response-time ms", { stream: morganStream }));

  // Health check
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok", service: "dsa-visualization-backend" });
  });

  // Algorithm step-generation routes — responses are cached in Redis
  const cache = cacheMiddleware.cacheRequest(3600);
  app.use("/sortingalgo",      cache, sortingRoutes);
  app.use("/searchingalgo",    cache, searchingRoutes);
  app.use("/graphalgo",        cache, graphRoutes);
  app.use("/shortestpathrouter", cache, shortestPathRoutes);
  app.use("/treealgo",         cache, treeRoutes);
  app.use("/linkedlist",       cache, linkedListRoutes);
  app.use("/stackalgo",        cache, stackRoutes);
  app.use("/queuealgo",        cache, queueRoutes);
  app.use("/dynamicalgo",      cache, dynamicAlgoRoutes);

  // Quiz routes — GET questions are cached; POST /answer is not (unique per user)
  app.use("/quiz/questions",   cache, quizRoutes);
  app.use("/quiz",             quizRoutes);

  // User progress routes — NOT cached (per-user, keyed by IP)
  app.use("/users", UserRouter);

  // Review submission
  app.post("/sendReview", (req, res) => sheetsCtrl.sendReview(req, res));

  // Global error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error("Unhandled error", { message: err.message, stack: err.stack });
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
}
