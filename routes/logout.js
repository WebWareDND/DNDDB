var express = require('express');
var auth = require('../lib/auth.js');
var router = express.Router();
var DBmodels = require('../DBModels/DBmodels.js');


/* GET home page. */
router.get('/', auth, function(req, res, next) {

    req.session.username = null;
    req.session.userID = null;
    res.render('login');

});

module.exports = router;
