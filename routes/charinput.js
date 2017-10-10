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
    targetChar.name = req.body.name
    targetChar.hp = req.body.hp
    targetChar.race = req.body.race
    targetChar.level = req.body.level

    targetChar.strength = req.body.strength
    targetChar.dexterity = req.body.dexterity
    targetChar.constitution = req.body.constitution
    targetChar.intelligence = req.body.intelligence
    targetChar.wisdom = req.body.wisdom
    targetChar.charisma = req.body.charisma

    instance.save(function (err) {
        if(err){
          console.log(err)
        }else{
          res.redirect('/')
        }
    })
})
module.exports = router;
