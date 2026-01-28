const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
    {
        id: 1,
        title: "Book 1",
        author: "Author 1"
    }, {
        id: 2,
        title: "Book 2",    
        author: "Author 2"
    } , {
        id: 3,
        title: "Book 3",
        author: "Author 3"
    }
]

app.get('/', (req, res) => {
    res.send('Welcome to the Book API');
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

app.post('/books', (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).send('Title and author are required');
    }
    const book = {
        id : books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title: req.body.title,
        author: req.body.author
    }
    books.push(book);
    res.json(book);
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    if (!req.body.title || !req.body.author) {
        return res.status(400).send('Title and author are required');
    }

    book.title = req.body.title;
    book.author = req.body.author;
    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Book not found');

    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});