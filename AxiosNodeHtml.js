const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

var bodyParser = require('body-parser');
const base_url = "http://localhost:3000";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${base_url + '/books'}`);
        res.render("books", { books: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching books");
    }
});

app.get("/book/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("book", { book: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching book");
    }
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    try {
        const data = { title: req.body.title, author : req.body.author };
        await axios.post(base_url + '/books', data);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating book");
    }
});

app.get("/update/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("update", { book: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching book");
    }
});

app.post("/update/:id", async (req, res) => {
    try {
        const data = { title: req.body.title, author : req.body.author };
        await axios.put(base_url + '/books/' + req.params.id, data);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating book");
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + '/books/' + req.params.id);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting book");
    }
});

app.listen(5500, () => {
    console.log("Server is running on port 5500");
})