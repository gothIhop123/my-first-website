const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "PWA app")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/fanfic", function (req, res) {
    res.sendFile(path.join(__dirname, "fanfic.html"));
});

app.get("/feet", function (req, res) {
    res.sendFile(path.join(__dirname, "feet.html"));
});


app.listen(8000, () => console.log("Server is running on Port 8000, visit http://localhost:8000/ or http://127.0.0.1:8000 to access your website") );