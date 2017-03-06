var express = require('express');
var routerUser = express.Router();

/* GET users listing. */
routerUser.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = routerUser;
