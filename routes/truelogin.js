var express = require('express');
var router = express.Router();
var DBmodels = require('../DBModels/DBmodels.js');
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('truelogin');
});

router.post('/login', function(req, res, next){
    DBmodels.account.findOne({username:req.body.username, password:req.body.password},function (err,targetAccount) {
    try {
        req.session.username = req.body.username
        req.session.userID = targetAccount._id;
        res.redirect('/')
    } catch (err){
      console.log(err);
      res.render('truelogin')
    }
    });
});

module.exports = router;
