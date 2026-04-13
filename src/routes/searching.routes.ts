import { Router, RequestHandler } from "express";
import { SearchingController } from "../controllers/searching.controller";

const router = Router();
const ctrl = new SearchingController();

router.post("/linearsearch", ctrl.linearSearch.bind(ctrl) as RequestHandler);
router.post("/binarysearch", ctrl.binarySearch.bind(ctrl) as RequestHandler);

export default router;
