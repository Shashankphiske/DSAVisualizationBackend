const express = require("express");
const { bubblesort } = require("../controllers/sortingalgo/bubblesort");
const { selectionsort } = require("../controllers/sortingalgo/selectionsort");
const { insertionsort } = require("../controllers/sortingalgo/insertionsort");
const { mergesort } = require("../controllers/sortingalgo/mergesort");
const { quicksort } = require("../controllers/sortingalgo/quicksort");
const { heapsort } = require("../controllers/sortingalgo/heapsort");


const router = express.Router();

router.post("/bubblesort", bubblesort);
router.post("/selectionsort", selectionsort);
router.post("/insertionsort", insertionsort);
router.post("/mergesort", mergesort);
router.post("/quicksort", quicksort);
router.post("/heapsort", heapsort);

module.exports = router;