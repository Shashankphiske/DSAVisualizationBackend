import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import sortingRoutes from "../routes/sorting.routes";
import searchingRoutes from "../routes/searching.routes";
import graphRoutes from "../routes/graph.routes";
import shortestPathRoutes from "../routes/shortestpath.routes";
import treeRoutes from "../routes/tree.routes";
import linkedListRoutes from "../routes/linkedlist.routes";
import stackRoutes from "../routes/stack.routes";
import queueRoutes from "../routes/queue.routes";
import dynamicAlgoRoutes from "../routes/dynamicalgo.routes";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import { SheetsController } from "../controllers/sheets.controller";
import { logger } from "../logger/logger";

const sheetsCtrl = new SheetsController();

const limiter = rateLimit({
  windowMs: 60*1000,
  max: 50,
  message: "Too many requests",
  standardHeaders: true,
  legacyHeaders: false
});

const stream = {
  write: (message: string) => logger.info(message.trim())
};

export function createApp(): Application {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(limiter);
  app.use(morgan(`:method :url :response-time ms`, { stream }));

  app.get("/", (_req: Request, res: Response) => {
    res.send("hello, world!");
  });

  app.use("/sortingalgo", sortingRoutes);
  app.use("/searchingalgo", searchingRoutes);
  app.use("/graphalgo", graphRoutes);
  app.use("/shortestpathrouter", shortestPathRoutes);
  app.use("/treealgo", treeRoutes);
  app.use("/linkedlist", linkedListRoutes);
  app.use("/stackalgo", stackRoutes);
  app.use("/queuealgo", queueRoutes);
  app.use("/dynamicalgo", dynamicAlgoRoutes);

  app.post("/sendReview", (req, res) => sheetsCtrl.sendReview(req, res));

  return app;
}
