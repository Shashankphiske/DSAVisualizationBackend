import { Router, RequestHandler } from "express";
import { SortingController } from "../controllers/sorting.controller";

const router = Router();
const ctrl = new SortingController();

router.post("/bubblesort", ctrl.bubbleSort.bind(ctrl) as RequestHandler);
router.post("/selectionsort", ctrl.selectionSort.bind(ctrl) as RequestHandler);
router.post("/insertionsort", ctrl.insertionSort.bind(ctrl) as RequestHandler);
router.post("/mergesort", ctrl.mergeSort.bind(ctrl) as RequestHandler);
router.post("/quicksort", ctrl.quickSort.bind(ctrl) as RequestHandler);
router.post("/heapsort", ctrl.heapSort.bind(ctrl) as RequestHandler);

export default router;
