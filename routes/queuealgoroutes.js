const express = require("express");
const { enqueue } = require("../controllers/queuealgo/enqueue");
const { dequeue } = require("../controllers/queuealgo/dequeue");

const queueAlgoRouter = express.Router()

queueAlgoRouter.post("/enqueue", enqueue);
queueAlgoRouter.post("/dequeue", dequeue);

module.exports = { queueAlgoRouter }