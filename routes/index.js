var express = require('express');
var auth = require('../lib/auth.js');
var router = express.Router();

/* GET home page. */
router.get('/', auth, function(req, res, next) {

  res.render('index');
});

module.exports = router;
