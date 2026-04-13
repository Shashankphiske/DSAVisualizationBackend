import { Router } from "express";
import { StackController } from "../controllers/stack.controller";

const router = Router();
const ctrl = new StackController();

router.post("/stackpush", (req, res) => ctrl.push(req, res));
router.post("/stackpop",  (req, res) => ctrl.pop(req, res));

export default router;
