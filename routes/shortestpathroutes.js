const express = require("express");
const { dijkstrasalgo } = require("../controllers/shortestpath/dijkstrasalgo");
const { astaralgo } = require("../controllers/shortestpath/astaralgo");

const shortestPathRouter = express.Router();

shortestPathRouter.post("/dijkstrasalgo", dijkstrasalgo);
shortestPathRouter.post("/astaralgo", astaralgo);

module.exports = { shortestPathRouter }