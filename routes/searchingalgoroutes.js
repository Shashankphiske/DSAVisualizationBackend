const express = require("express");
const { linearsearch } = require("../controllers/searchingalgo/linearsearch");
const { binarysearch } = require("../controllers/searchingalgo/binarysearch");

const searchRouter = express.Router();

searchRouter.post("/linearsearch", linearsearch);
searchRouter.post("/binarysearch", binarysearch);

module.exports = { searchRouter }