const express = require("express");
const sortingrouter = require("./routes/sortingalgoroutes");

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello, world!");
})

app.use("/sortingalgo", sortingrouter);

app.listen(PORT);