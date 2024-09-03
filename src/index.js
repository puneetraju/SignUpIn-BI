const express = require('express');
const app = express();
const path = require("path");
const collection = require("./mongo");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");


app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", async (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };
    await collection.insertMany([data]);
    res.render("home");
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });

        if (check && check.password === req.body.password) {
            res.render("home");
        } else {
            res.send("Wrong Password");
        }
    } catch (error) {
        res.send("Wrong details");
    }
});

app.get('/logout', (req, res) => {   
     res.redirect('/');
});

//server
app.listen(3500, () => {
    console.log("Server running on port 3500");
});
