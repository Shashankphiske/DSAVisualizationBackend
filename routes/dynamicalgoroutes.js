const express = require("express")
const { lcs } = require("../controllers/dynamicalgo/lcs")
const { fibonacci } = require("../controllers/dynamicalgo/fibonacci");
const { coinChange } = require("../controllers/dynamicalgo/coinchange");

const dynamicalgorouter = express.Router()

dynamicalgorouter.post("/fibonacci", fibonacci);
dynamicalgorouter.post("/coinchange", coinChange);

module.exports = { dynamicalgorouter }