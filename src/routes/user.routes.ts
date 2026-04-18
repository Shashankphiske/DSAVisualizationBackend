import { Router, RequestHandler } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const ctrl = new UserController();

router.get("/:dsatype", ctrl.getSolvedQuestions.bind(ctrl) as RequestHandler);

router.post("/:dsatype", ctrl.saveSolvedQuestions.bind(ctrl) as RequestHandler);

export {router as UserRouter};