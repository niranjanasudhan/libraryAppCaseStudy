const express = require('express');
const adminRouter = express.Router();
const Bookdata = require('../model/Bookdata');
const Authordata = require('../model/Authordata');
const multer = require('multer');

// const upload = multer({ dest: __dirname + '../../public/images/book' });
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/book')
    },
    filename: function(req, file, cb) {
        // cb(null, file.originalname)
        cb(null, file.fieldname + '-' + Date.now());
    }
})

var storage1 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/author')
    },
    filename: function(req, file, cb) {
        // cb(null, file.originalname)
        cb(null, file.fieldname + '-' + Date.now());
    }
})

var upload = multer({ storage: storage })
var upload1 = multer({ storage: storage1 })


function router(nav) {
    adminRouter.get('/add-book', function(req, res) {
        res.render('books/add-book', {
            nav,
            title: 'Library App'
        })
    });

    adminRouter.get('/add-author', function(req, res) {
        res.render('authors/add-author', {
            nav,
            title: 'Library App'
        })
    });

    adminRouter.get('/editBook/:id', function(req, res) {
        const id = req.params.id;
        Bookdata.findOne({ _id: id })
            .then(function(book) {
                res.render('books/edit-book', {
                    nav,
                    title: 'Library App',
                    book
                });
            });
    });

    adminRouter.get('/deleteBook/:id', function(req, res) {
        const id = req.params.id;
        Bookdata.deleteOne({ _id: id })
            .then(function(book) {
                // res.render('books/books', {
                //     nav,
                //     title: 'Library App',
                //     book
                // });
                res.redirect('/books');
            });
    });


    adminRouter.get('/editAuthor/:id', function(req, res) {
        const id = req.params.id;
        Authordata.findOne({ _id: id })
            .then(function(author) {
                res.render('authors/edit-author', {
                    nav,
                    title: 'Library App',
                    author
                });
            });
    });

    adminRouter.get('/deleteAuthor/:id', function(req, res) {
        const id = req.params.id;
        Authordata.deleteOne({ _id: id })
            .then(function(author) {
                // res.render('authors/authors', {
                //     nav,
                //     title: 'Library App',
                //     author
                // });
                res.redirect('/authors');
            });
    });

    adminRouter.post('/add', upload.single('image'), function(req, res) {
        // if (req.file) {
        //     res.json(req.file);
        // } else throw 'error';
        var item = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            //image: req.body.image
            image: req.file.filename

        }
        var book = Bookdata(item);
        book.save();
        res.redirect('/books');

    })

    adminRouter.post('/edit', upload.single('image'), function(req, res) {
        const id = req.body.id;
        if (req.file) {
            var item = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                description: req.body.description,
                // image: req.body.image

                image: req.file.filename
            }
        } else {
            var item = {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                description: req.body.description
            }
        }
        // var book = Bookdata(item);

        if (req.file) {
            var ab = Bookdata.updateOne({ _id: id }, { $set: { 'title': item.title, 'author': item.author, 'genre': item.genre, 'description': item.description, 'image': item.image } }, (err, result) => {
                if (err) {
                    return console.log(err);
                }
            });
        } else {
            var ab = Bookdata.updateOne({ _id: id }, { $set: { 'title': item.title, 'author': item.author, 'genre': item.genre, 'description': item.description } }, (err, result) => {
                if (err) {
                    return console.log(err);
                }
            });
        }

        res.redirect('/books');


    })

    adminRouter.post('/editAuthor', upload1.single('image'), function(req, res) {
        const id = req.body.id;
        if (req.file) {
            var item = {
                name: req.body.name,
                genre: req.body.genre,
                description: req.body.description,
                // image: req.body.image
                image: req.file.filename
            }
        } else {
            var item = {
                name: req.body.name,
                genre: req.body.genre,
                description: req.body.description,
                // image: req.body.image

            }
        }
        // var book = Bookdata(item);

        if (req.file) {
            var ab = Authordata.updateOne({ _id: id }, { $set: { 'name': item.name, 'genre': item.genre, 'description': item.description, 'image': item.image } }, (err, result) => {
                if (err) {
                    return console.log(err);
                }
            });
        } else {
            var ab = Authordata.updateOne({ _id: id }, { $set: { 'name': item.name, 'genre': item.genre, 'description': item.description } }, (err, result) => {
                if (err) {
                    return console.log(err);
                }
            });
        }

        res.redirect('/authors');


    })



    adminRouter.post('/addNew', upload1.single('image'), function(req, res) {
        var item = {
            name: req.body.name,
            genre: req.body.genre,
            description: req.body.description,
            image: req.file.filename
                // image: req.body.image
        }
        var author = Authordata(item);
        author.save();
        res.redirect('/authors');

    })

    return adminRouter;
}
module.exports = router;