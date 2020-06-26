const express = require('express');
const { request } = require('express');
const app = new express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const nav = [
    { link: '/', name: 'Home' },
    { link: '/books', name: 'Books' },
    { link: '/authors', name: 'Authors' },
    { link: '/admin/add-book', name: 'Add Book' },
    { link: '/admin/add-author', name: 'Add Author' },
    { link: '/sign-in', name: 'Sign In' },
    { link: '/sign-up', name: 'Sign Up' }
]
const bookRouter = require('./src/routes/bookRoutes')(nav);
const authorRouter = require('./src/routes/authorRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/admin', adminRouter);
app.use('/', authRouter);
app.get('/', function(req, res) {
    res.render("index", {
        nav,
        title: 'Library App'
    });
});

app.listen(5000);