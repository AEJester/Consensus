const app = require("express")();
const express = require("express");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const DB = require("data-chest");
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.static(path.join(__dirname)))

app.set("view engine", "ejs")

app.use(bodyParser());

app.get("/", (req, res) => {
    res.render(__dirname+"/views/index");
})

app.get("/create", (req, res) => {
    res.render(__dirname+"/views/create")
});

http.listen(8080, () => {
    console.log("Listening on *:8080");
});