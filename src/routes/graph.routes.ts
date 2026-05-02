import { Router } from "express";
import { GraphController } from "../controllers/graph.controller";

const router = Router();
const ctrl = new GraphController();

router.post("/breadthfirstsearch", (req, res) => ctrl.bfs(req, res));
router.post("/depthfirstsearch", (req, res) => ctrl.dfs(req, res));

export default router;
