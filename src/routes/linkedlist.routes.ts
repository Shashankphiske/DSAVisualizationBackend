import { Router } from "express";
import { LinkedListController } from "../controllers/linkedlist.controller";

const router = Router();
const ctrl = new LinkedListController();

router.post("/singlyinsertion", (req, res) => ctrl.singlyInsertion(req, res));
router.post("/doublyinsertion", (req, res) => ctrl.doublyInsertion(req, res));
router.post("/singlydeletion",  (req, res) => ctrl.singlyDeletion(req, res));
router.post("/doublydeletion",  (req, res) => ctrl.doublyDeletion(req, res));
router.post("/singlyreversal",  (req, res) => ctrl.singlyReversal(req, res));
router.post("/doublyreversal",  (req, res) => ctrl.doublyReversal(req, res));

export default router;
