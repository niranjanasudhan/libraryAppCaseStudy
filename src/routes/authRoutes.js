const express = require('express');
const authRouter = express.Router();
const Authdata = require('../model/Authdata');

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
        var item = {
            email: req.body.email,
            password: req.body.password,

        }
        console.log(req.body.email);
        console.log(req.body.password);
        // var auth = Authdata(item);
        //let dcheck = Authdata.findOne({ 'email': item.email });
        Authdata.findOne({ 'email': item.email, 'password': item.password }, function(err, obj) {

            console.log(obj);
            if (!obj) {



                res.redirect('/sign-in/inv');

            } else {
                res.redirect('/');
            }

        });



    })



    return authRouter;
}
module.exports = router;