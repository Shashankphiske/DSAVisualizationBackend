import { Router } from "express";
import { ShortestPathController } from "../controllers/shortestpath.controller";

const router = Router();
const ctrl = new ShortestPathController();

router.post("/dijkstrasalgo", (req, res) => ctrl.dijkstra(req, res));
router.post("/astaralgo", (req, res) => ctrl.aStar(req, res));

export default router;
