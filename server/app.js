const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

const PORT = process.env.PORT || 5000;

app.get("/api/random", async (req, res, next) => {
    try {
        const response = await axios.get("https://favqs.com/api/qotd")
        res.send(response.data.quote)
    } catch (err) {
        next(err)
    }
})

if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets
    app.use(express.static("build"));

    // Express will serve up the front-end index.html file if it doesn't recognize the route
    app.get("*", (req, res) =>
        res.sendFile(path.resolve("build", "index.html"))
    );
}

if (process.env.NODE_ENV === "dev") {
    // Express will serve up production assets
    app.use(express.static("public"));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve("public", "index.html"))
    );
}

app.listen(PORT, () => { console.log("Server started") })