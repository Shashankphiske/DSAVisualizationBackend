import { Router } from "express";
import { TreeController } from "../controllers/tree.controller";

const router = Router();
const ctrl = new TreeController();

router.post("/inorder",   (req, res) => ctrl.inorder(req, res));
router.post("/preorder",  (req, res) => ctrl.preorder(req, res));
router.post("/postorder", (req, res) => ctrl.postorder(req, res));

export default router;
