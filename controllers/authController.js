var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var authController = function (nav) {

        var home = (function (req, res) {
            res.render('auth', {
                title: 'Blog',
                subTitle: 'This is  just for github'
            });
        });

        var add = (function (req, res) {
            var url = 'mongodb://localhost:27017/blog';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');

                var dt = new Date();
                var user = {
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    created: dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
                };
                collection.insert(user, function (err, results) {
                    res.redirect('/posts/');
                });
            });
            //res.send(' post instered');
        });



        return {
            add: add,
            home:home
        }
    }
    ;

module.exports = authController;