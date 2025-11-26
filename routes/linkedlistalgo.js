const express = require("express");
const { singlyinsertion } = require("../controllers/linkedlistalgo/singlyinsertion");
const { doublyInsertion } = require("../controllers/linkedlistalgo/doublyinsertion");
const { singlyDeletion } = require("../controllers/linkedlistalgo/singlydeletion");
const { doublyDeletion } = require("../controllers/linkedlistalgo/doublydeletion");
const { singlyReverse } = require("../controllers/linkedlistalgo/singlyreversal");
const { doublyReverse } = require("../controllers/linkedlistalgo/doublyreversal");

const linkedListRouter = express.Router();

linkedListRouter.post("/singlyinsertion", singlyinsertion);
linkedListRouter.post("/doublyinsertion", doublyInsertion);
linkedListRouter.post("/singlydeletion", singlyDeletion);
linkedListRouter.post("/doublydeletion", doublyDeletion);
linkedListRouter.post("/singlyreversal", singlyReverse);
linkedListRouter.post("/doublyreversal", doublyReverse);

module.exports = { linkedListRouter }