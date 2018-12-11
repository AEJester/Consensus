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

app.post("/done", (req, res) => {
    let x = parseInt(DB.get("latest", "latestquizid"));
    req.body.quizid = x;
    DB.store(x.toString(), req.body, "quizzes");
    let y = x
    x = x + 1;
    DB.store("latest", x.toString(), "latestquizid");
    res.render(__dirname+"/views/done", {quizid: y})
});

app.get("/take/:quizid", (req, res) => {
    let data = DB.get(req.params.quizid, "quizzes");
    res.render(__dirname+"/views/take", {quiz: data});
});

app.post("/submit", (req, res) => {
    let x = DB.get(req.body.quizid, "results", []);
    x.push(req.body);
    DB.store(req.body.quizid, x, "results");
    res.render(__dirname+"/views/submit");
})

app.get("/random", (req, res) => {
    let x = parseInt(DB.get("latest", "latestquizid"));
    let num = Math.floor(Math.random() * (x-1));
    res.redirect("/take/"+num);
});

app.get("/trending", (req, res) => {
    let x = parseInt(DB.get("latest", "latestquizid"));
    let quizzes = []
    for (let i = 0; i < x; i++) {
        if (DB.get(i.toString(), "results").length >= 0) {
            quizzes.push({id:i,results:DB.get(i, "results").length});
        }
        console.log(DB.get(i.toString(), "results"))
    }
    console.log(x);
    console.log(quizzes);
    res.render(__dirname+"/views/trending", {quizzes: quizzes});
});

app.get("/new", (req, res) => {
    let quizzes = [];
    for (let i = (parseInt(DB.get("latest", "latestquizid"))-1); i >= 0; i--) {
        quizzes.push({id:i, results:DB.get(i, "results").length})
    }
    res.render(__dirname+"/views/new", {quizzes: quizzes});
});

app.get("/contact", (req, res) => {
    res.render(__dirname+"/views/contact");
});

app.post("/send", (req, res) => {
    let x = DB.get("contacts", "contact", []);
    x.push({email:req.body.email,reason:req.body.reason});
    DB.store("contacts", x, "contact");
    res.render(__dirname+"/views/submit");
});

app.get("/about", (req, res) => {
    res.render(__dirname+"/views/about");
});

app.get("/api/results/:quizid", (req, res) => {
    if (req.query.apikey) {
        if (DB.get(req.query.apikey, "apikeys", "") != "") {
            if (DB.get(req.params.quizid, "results", "") != "") {
                res.send({response: 200, body: DB.get(req.params.quizid, "results")})
            } else {
                res.send({response: 404, body: "No quiz found for that ID."})
            }
        } else {
            res.send({response: 401, body: "The api key provided is invalid."})
        }
    } else {
        res.send({response: 401, body: "You did not provide an API key. Please obtain one before using this."})
    }
});

app.get("/api/quizzes/:quizid", (req, res) => {
    if (req.query.apikey) {
        if (DB.get(req.query.apikey, "apikeys", "") != "") {
            if (DB.get(req.params.quizid, "quizzes", "") != "") {
                res.send({response: 200, body: DB.get(req.params.quizid, "quizzes")})
            } else {
                res.send({response: 404, body: "No quiz found for that ID."})
            }
        } else {
            res.send({response: 401, body: "The api key provided is invalid."})
        }
    } else {
        res.send({response: 401, body: "You did not provide an API key. Please obtain one before using this."})
    }
});

app.get("/api/stats", (req, res) => {
    if (req.query.apikey) {
        if (DB.get(req.query.apikey, "apikeys", "") != "") {
            res.send({response: 200, body: {totalQuizzes: DB.get("latest", "latestquizid")}});
        } else {
            res.send({response: 401, body: "The api key provided is invalid."});
        }
    } else {
        res.send({response: 401, body: "You did not provide an API key. Please obtain one before using this."});
    }
});

app.get("/developers", (req, res) => {
    res.render(__dirname+"/views/developers")
});

app.post("/apply", (req, res) => {
    let objec = {
        email: req.body.email,
        key: req.body.key,
        reason: req.body.reason
    }
    let x = DB.get("applications", "applications", []);
    x.push(objec);
    DB.store("applications", x, "applications");
    res.render(__dirname+"/views/apply");
});

app.get("/find", (req, res) => {
    res.render(__dirname+"/views/find");
});

app.post("/results", (req, res) => {
    let quizid = req.body.id;
    console.log(quizid)
    let x = DB.get(quizid, "results", []);
    console.log(x)
    res.render(__dirname+"/views/results", {results: x, id: quizid});
});

http.listen(8080, () => {
    console.log("Listening on *:8080");
});