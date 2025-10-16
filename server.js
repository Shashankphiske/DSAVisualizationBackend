const express = require("express");
const sortingrouter = require("./routes/sortingalgoroutes");
const { searchRouter } = require("./routes/searchingalgoroutes");
const { graphRouter } = require("./routes/graphalgoroutes");
const { shortestPathRouter } = require("./routes/shortestpathroutes");

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

app.listen(PORT);