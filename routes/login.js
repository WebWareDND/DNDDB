var express = require('express');
var router = express.Router();
var DBmodels = require('../DBModels/DBmodels.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('login');
});

router.post('/login', function(req, res, next){
    DBmodels.account.findOne({username:req.body.username, password:req.body.password},function (err,targetAccount) {
    try {
        req.session.username = req.body.username
        req.session.userID = targetAccount._id;
        res.redirect('/')
    } catch (err){
      console.log(err);
      res.render('login')
    }
    });
});

router.post('/register', function(req, res, next){
    console.log("got register " + req.body.username + req.body.password)
    //try to create a new account
    var instance = new DBmodels.account
    instance.username = req.body.username;
    instance.password = req.body.password;

    instance.save(function (err) {
          res.redirect('/login');
    })

});
module.exports = router;
