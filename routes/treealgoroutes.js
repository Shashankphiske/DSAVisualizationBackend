const express = require("express")
const { inorder } = require("../controllers/treealgo/inorder")
const { postorder } = require("../controllers/treealgo/postorder")
const { preorder } = require("../controllers/treealgo/preorder")

const treeRouter = express.Router()

treeRouter.post("/inorder", inorder)
treeRouter.post("/postorder", postorder)
treeRouter.post("/preorder", preorder);

module.exports = { treeRouter }