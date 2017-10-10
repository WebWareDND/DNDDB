var express = require('express');
var auth = require('../lib/auth.js');
var DBmodels = require('../DBModels/DBmodels.js');
var router = express.Router();

/* GET home page. */
router.get('/', auth, function(req, res, next) {
  console.log(req.query);
  DBmodels.character.findOne({_id:req.query.charID},function (err,charToEdit) {
      try {
          console.log("got charToEdit")
          res.render('fullcharedit',{charToEdit : charToEdit});
      }catch (err){

      }
  })
});

router.post('/editedchar',auth,function (req,res,next) {
    DBmodels.character.findOne({_id: req.body._id},function (err,targetChar) {
        try{
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

            targetChar.save(function (err) {
                if(err){
                    print(err);
                }
            })

            res.redirect('/fullcharedit?charID=' + req.body._id)
        }catch (err) {
            console.log(err)
        }
    })
})

module.exports = router;
