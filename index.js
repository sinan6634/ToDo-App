import express from "express";
import bodyParser from "body-parser";
import { appendFile } from "fs";

var currentDay = "";
var todayToDo = [];
var workToDo = [];

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(getDate);

function getDate(req, res, next) {
    var date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDay = date.toLocaleDateString('en-US', options);
    next();
}

app.get("/", (req, res) => {
    console.log(currentDay);
    res.render("today.ejs", {currentDay: currentDay, todayToDo: todayToDo});
});

app.post("/", (req, res) => {
    console.log(req.body.item);
    todayToDo.push(req.body.item);
    res.render("today.ejs", {currentDay: currentDay, todayToDo: todayToDo});
});

app.get("/work", (req, res) => {
    res.render("work.ejs", {workToDo: workToDo});
});

app.post("/work", (req, res) => {
    console.log(req.body.item);
    workToDo.push(req.body.item);
    res.render("work.ejs", {workToDo: workToDo});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});