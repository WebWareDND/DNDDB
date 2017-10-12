var express = require('express');
var router = express.Router();
var DBmodels = require('../DBModels/DBmodels.js');
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('login');
});



router.post('/register', function(req, res, next){
    console.log("got register " + req.body.username + req.body.password)
    //try to create a new account
    var instance = new DBmodels.account
    instance.username = req.body.username;
    instance.password = req.body.password;
    instance._id = new mongoose.Types.ObjectId();


    instance.save(function (err) {
        if(!err){
            res.redirect('/truelogin');

        }else{
            res.render('login')
        }


    })

});
module.exports = router;
