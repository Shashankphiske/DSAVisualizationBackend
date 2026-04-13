import { Router } from "express";
import { DynamicAlgoController } from "../controllers/dynamicalgo.controller";

const router = Router();
const ctrl = new DynamicAlgoController();

router.post("/fibonacci",  (req, res) => ctrl.fibonacci(req, res));
router.post("/coinchange",  (req, res) => ctrl.coinChange(req, res));
router.post("/lcs",         (req, res) => ctrl.lcs(req, res));

export default router;
