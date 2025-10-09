const express = require("express");
const { bfs } = require("../controllers/graphalgo/bfs");
const { dfs } = require("../controllers/graphalgo/dfs");

const graphRouter = express.Router();

graphRouter.post("/breadthfirstsearch", bfs);
graphRouter.post("/depthfirstsearch", dfs);

module.exports = { graphRouter }