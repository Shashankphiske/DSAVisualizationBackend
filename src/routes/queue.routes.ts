import { Router } from "express";
import { QueueController } from "../controllers/queue.controller";

const router = Router();
const ctrl = new QueueController();

router.post("/enqueue", (req, res) => ctrl.enqueue(req, res));
router.post("/dequeue", (req, res) => ctrl.dequeue(req, res));

export default router;
