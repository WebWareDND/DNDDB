var express = require('express');
var auth = require('../lib/auth.js');
var DBmodels = require('../DBModels/DBmodels.js');
var router = express.Router();

/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.render('charinput');
});

router.post('/newchar',auth,function (req,res,next) {
  var instance = new DBmodels.character;
  instance.name = req.body.name
  instance.strength = req.body.strength
  instance.wisdom = req.body.wisdom
  instance.hp = req.body.hp
  instance.owner = req.session.userID;

    instance.save(function (err) {
        if(err){
          console.log(err)
        }else{
          res.redirect('/')
        }
    })
})
module.exports = router;
