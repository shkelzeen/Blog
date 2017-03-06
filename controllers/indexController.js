var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var indexController = function (nav) {
        var posts = [{
            'Title': 'potato jpg',
            'Summary': 'Kentang Si bungsu dari keluarga Solanum tuberosum L ini ternyata memiliki khasiat untuk mengurangi kerutan  jerawat  bintik hitam dan kemerahan pada kulit  Gunakan seminggu sekali sebagai',
            'Url': 'http://www.mediaindonesia.com/spaw/uploads/images/potato.jpg',
            'ClickUrl': 'http://www.mediaindonesia.com/spaw/uploads/images/potato.jpg',
            'RefererUrl': 'http://www.mediaindonesia.com/mediaperempuan/index.php?ar_id=Nzkw',
            'FileSize': 22630,
            'FileFormat': 'jpeg',
            'Height': '362',
            'Width': '532',
            'Thumbnail': {
                'Url': 'http://thm-a01.yimg.com/nimage/557094559c18f16a',
                'Height': '98',
                'Width': '145'
            }
        },
            {
                'Title': "potato jpg",
                'Summary': 'Introduction of puneri aloo This is a traditional potato preparation flavoured with curry leaves and peanuts and can be eaten on fasting day  Preparation time   10 min',
                'Url': 'http://www.infovisual.info/01/photo/potato.jpg',
                'ClickUrl': 'http://www.infovisual.info/01/photo/potato.jpg',
                'RefererUrl': 'http://sundayfood.com/puneri-aloo-indian-%20recipe',
                'FileSize': 119398,
                'FileFormat': 'jpeg',
                'Height': '685',
                'Width': '1024',
                'Thumbnail': {
                    'Url': 'http://thm-a01.yimg.com/nimage/7fa23212efe84b64',
                    'Height': '107',
                    'Width': '160'
                }
            }];


        var get = function (req, res) {
            var url = 'mongodb://localhost:27017/blog';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('post');
                collection.find({}).toArray(
                    function (err, results) {
                        res.render('index', {
                            title: 'Blog',
                            subTitle: 'This is  just for github',
                            posts: results
                        });
                    });
            });
        };


        var add = (function (req, res) {
            var url = 'mongodb://localhost:27017/blog';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('post');
                collection.insertMany(posts,
                    function (err, results) {
                        res.send(results);
                        db.close();
                    });
            });
            //res.send(' post instered');
        });

        var getById = function (req, res) {
            var collectionOne = [];
            var collectionTwo = [];
            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/blog';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('post', function (err, collection) {
                    collection.findOne({_id: id},
                        function (err, results) {
                            var posts = results;
                            var collection = db.collection('comments');
                            collection.find({postId: id}).toArray(
                                function (err, resu) {
                                    res.render('post', {
                                        title: 'Blog',
                                        post: posts,
                                        comments: resu
                                    });
                                    db.close();
                                });
                        });
                });
            });
        };

        var addComment = function (req, res) {
            console.log(req.body);
            var id = new ObjectId(req.params.id);
            var url =
                'mongodb://localhost:27017/blog';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('comments');

                var dt = new Date();
                var comment = {
                    postId: id,
                    content: req.body.content,
                    created: dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
                };
                collection.insert(comment, function (err, results) {
                    res.redirect('/posts/' + id);
                });
            });
        };

        var form = function (req, res, next) {

            if (!req.user) {
                res.redirect('/auth/register');
            }

            res.render('addPosts', {
                title: 'Blog',
                subTitle: 'This is  just for github',

            });

        };

        var add = function (req, res, next) {

            if (!req.user) {
                res.redirect('/auth/register');
            }

            var url =
                'mongodb://localhost:27017/blog';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('post');

                var dt = new Date();
                var post = {
                    title: req.body.title,
                    author: req.user.username,
                    content: req.body.content,
                    created: dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()
                };
                collection.insert(post, function (err, results) {
                    res.redirect('/posts');
                });
            });
        };

        return {
            get: get,
            getById: getById,
            addComment: addComment,
            form: form,
            add: add
        }
    }
    ;

module.exports = indexController;