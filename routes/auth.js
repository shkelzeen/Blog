var express = require('express');
var routerAuth = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var nav = [{
    Link: '/books', Text: 'Books'
}, {
    Link: '/authors', Text: 'Authors'
}];
var controller = require('../controllers/authController')(nav);

/* GET home page. */
routerAuth.get('/register', controller.home)
routerAuth.post('/register', controller.add);
routerAuth.post('/login',passport.authenticate('local', {
        failureRedirect:'/posts/'
    }), function (req, res ) {
        res.redirect('/auth/register');
    });

//router.post('/:id/addComment', controller.addComment);



module.exports = routerAuth;

