const express = require('express');
const bookRouter = express.Router();
const Bookdata = require('../model/Bookdata');

function router(nav) {


    bookRouter.get('/', function(req, res) {
        Bookdata.find()
            .then(function(book) {
                res.render("books/books", {
                    nav,
                    title: 'Library App',
                    book
                });
            })

    });
    bookRouter.get('/:id', function(req, res) {
        const id = req.params.id;
        Bookdata.findOne({ _id: id })
            .then(function(book) {
                res.render('books/book', {
                    nav,
                    title: 'Library App',
                    book
                });
            })


    });
    return bookRouter;
}

module.exports = router;