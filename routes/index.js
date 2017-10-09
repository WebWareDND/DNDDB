var express = require('express');
var auth = require('../lib/auth.js');
var router = express.Router();
var DBmodels = require('../DBModels/DBmodels.js');


/* GET home page. */
router.get('/', auth, function(req, res, next) {

  DBmodels.character.find({owner:req.session.userID},function (err,ownedChars) {
      DBmodels.adventure.find({owner:req.session.userID},function (err,ownedParties) {
          DBmodels.invitation.find({player:req.session.userID},function (err,ownedInvitations) {
              res.render('index', {ownedChars: ownedChars, ownedParties: ownedParties, ownedInvitations:ownedInvitations});
          });
      })
  })
});

router.post('/newadventure',auth,function (req,res,next) {
    var instance = new DBmodels.adventure
    instance.owner = req.session.userID
    if (req.body.adventurename.length>0){
        instance.name = req.body.adventurename

        instance.save(function (err) {
            try{
                res.redirect('/')
            }catch (err){
                console.log(err)
                res.redirect('/')
            }
        })
    }else {
        res.redirect('/')

    }

})

router.post('/sendinvite',auth,function (req,res,next) {
    var instance = new DBmodels.invitation
    instance.party = req.body.partyID
    DBmodels.account.findOne({username:req.body.invitedname},function (err,targetAccount) {
        try {
        instance.player = targetAccount._id;
        instance.character = null;
        instance.save(function (err) {
            try{
                res.redirect('/')
            }catch (err){
                console.log(err)
                res.redirect('/')
            }
        })
        }catch (err){
            console.log(err)
            res.redirect('/')
        }
    })

})


module.exports = router;
