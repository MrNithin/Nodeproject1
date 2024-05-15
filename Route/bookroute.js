const express = require("express");
const router = express.Router();
const Book = require("../Model/bookdb");
const { type } = require("express/lib/response");

// GET request to render the add_book.ejs template
router.get('/', async (req, res) => {
  await res.render("add_book");
});

// POST request to handle form submission and store values in the database
router.post('/add-book', async (req, res) => {
    try {
        // Extract data from request body
        const { id, title, author, genre, publishYear } = req.body;

        // Convert publishYear to a number if it's not already
        const publishedYear = parseInt(publishYear);

        // Create a new book document
        const newBook = new Book({
            Id: id,
            Title: title,
            Author: author,
            Genre: genre,
            Published_year: publishedYear
        });

        // Save the new book document to the database
        await newBook.save();

        // Redirect back to the form page or any other page you desire
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

router.get('/display-books', async (req, res) => {
    try {
        const books = await Book.find();
        res.render('display-books', { books: books });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
router.put('/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findOneAndUpdate(
            { Id: req.params.id },  // Corrected the query to find by ID
            { 
                Title: req.body.Title,
                Author: req.body.Author,
                Genre: req.body.Genre,
                Published_year: req.body.Published_year
            }, 
            { new: true }
        );

        // Check if book is found and updated
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ message: 'Error updating book' });
    }
});

router.delete('/books/:id', async (req, res) => {
    var bookId = req.params.id;
    bookId = parseInt(bookId);
    try {

        // Find the book by ObjectId and delete it
        const deletedBook = await Book.findOneAndDelete({Id : bookId});

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'An error occurred while deleting the book' });
    }
});

module.exports = router;
