const express = require("express");
const { bubblesort } = require("../controllers/sortingalgo/bubblesort");
const { selectionsort } = require("../controllers/sortingalgo/selectionsort");


const router = express.Router();

router.post("/bubblesort", bubblesort);
router.post("/selectionsort", selectionsort);

module.exports = router;