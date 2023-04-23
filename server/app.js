const express = require("express");
const app = express();
const axios = require("axios");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log("Server started") })

app.use(express.static("build"));


app.get("/api/random", async (req, res) => {
    try {
        const response = await axios.get("https://favqs.com/api/qotd")
        res.send(response.data.quote)
    } catch (err) {
        res.send(err)
    }
})