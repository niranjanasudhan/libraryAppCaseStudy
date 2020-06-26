const express = require('express');
const authorRouter = express.Router();
const Authordata = require('../model/Authordata');


function router(nav) {
    authorRouter.get('/', function(req, res) {
        Authordata.find()
            .then(function(author) {
                res.render("authors/authors", {
                    nav,
                    title: 'Library App',
                    author
                });
            });
    });

    authorRouter.get('/:id', function(req, res) {
        const id = req.params.id;
        Authordata.findOne({ _id: id })
            .then(function(author) {
                res.render('authors/author', {
                    nav,
                    title: 'Library App',
                    author: author
                });
            });

    });

    return authorRouter;
}
module.exports = router;