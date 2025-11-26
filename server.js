const express = require("express");
const sortingrouter = require("./routes/sortingalgoroutes");
const { searchRouter } = require("./routes/searchingalgoroutes");
const { graphRouter } = require("./routes/graphalgoroutes");
const { shortestPathRouter } = require("./routes/shortestpathroutes");
const { treeRouter } = require("./routes/treealgoroutes");
const { linkedListRouter } = require("./routes/linkedlistalgo");
const { stackAlgoRouter } = require("./routes/stackalgoroutes");
const { queueAlgoRouter } = require("./routes/queuealgoroutes");

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello, world!");
})

app.use("/sortingalgo", sortingrouter);
app.use("/searchingalgo", searchRouter);
app.use("/graphalgo", graphRouter);
app.use("/shortestpathrouter", shortestPathRouter);
app.use("/treealgo", treeRouter);
app.use("/linkedlist", linkedListRouter);
app.use("/stackalgo", stackAlgoRouter);
qpp.use("/queuealgo", queueAlgoRouter);

app.listen(PORT);