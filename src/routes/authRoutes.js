const express = require('express');
const authRouter = express.Router();
const Authdata = require('../model/Authdata');
var sess;

function router(nav) {


    authRouter.get('/sign-in', function(req, res) {
        res.render("sign-in", {
            nav,
            title: 'Library App',
            err_msg: ''
        });
    });
    authRouter.get('/sign-in/inv', function(req, res) {
        res.render("sign-in", {
            nav,
            title: 'Library App',
            err_msg: 'Invalid username or password'
        });
    });
    authRouter.get('/sign-up', function(req, res) {
        res.render("sign-up", {
            nav,
            title: 'Library App'
        });
    });
    authRouter.get('/success', function(req, res) {
        res.render("success", {
            nav,
            title: 'Library App'
        });
    });

    authRouter.post('/new', function(req, res) {
        var item = {
            user_type: req.body.user_type,
            name: req.body.name,
            gender: req.body.gender,
            dob: req.body.dob,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        }
        var auth = Authdata(item);
        auth.save();
        res.redirect('/success');

    })

    authRouter.post('/check', function(req, res) {
        sess = req.session;
        var item = {
            email: req.body.email,
            password: req.body.password,

        }
        Authdata.findOne({ 'email': item.email, 'password': item.password }, function(err, obj) {

            if (!obj) {



                res.redirect('/sign-in/inv');

            } else {
                console.log(obj.user_type);
                req.session.user_type = obj.user_type;
                res.redirect('/');
            }

        });



    })



    return authRouter;
}
module.exports = router;