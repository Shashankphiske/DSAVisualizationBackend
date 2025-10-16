const express = require("express");
const { dijkstrasalgo } = require("../controllers/shortestpath/dijkstrasalgo");

const shortestPathRouter = express.Router();

shortestPathRouter.post("/dijkstrasalgo", dijkstrasalgo)

module.exports = { shortestPathRouter }