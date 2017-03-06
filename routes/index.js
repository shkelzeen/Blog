var express = require('express');
var router = express.Router();

var nav = [{
    Link: '/books', Text: 'Books'
}, {
    Link: '/authors', Text: 'Authors'
}];
var controller = require('../controllers/indexController')(nav);

/* GET home page. */
//router.get('/add', controller.add);

/* GET home page. */
router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/:id/addComment', controller.addComment);
router.get('/admin/form', controller.form);
router.post('/admin/add', controller.add);




module.exports = router;
