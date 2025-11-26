const express = require("express");
const { push } = require("../controllers/stackalgo/push");
const { pop } = require("../controllers/stackalgo/pop");

const stackAlgoRouter = express.Router();

stackAlgoRouter.post("/stackpush", push);
stackAlgoRouter.post("/stackpop", pop);

module.exports = { stackAlgoRouter }