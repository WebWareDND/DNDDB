var express = require('express');
var auth = require('../lib/auth.js');
var router = express.Router();
var DBmodels = require('../DBModels/DBmodels.js');


/* GET home page. */
router.get('/', auth, function(req, res, next) {

  DBmodels.character.find({owner:req.session.userID},function (err,ownedChars) {
      DBmodels.adventure.find({owner:req.session.userID},function (err,ownedAdventures) {
          DBmodels.invitation.find({player:req.session.userID}).populate('adventure').populate('character').exec(function (err,ownedInvitations){


              res.render('index', {ownedChars: ownedChars, ownedAdventures: ownedAdventures,ownedInvitations:ownedInvitations})

              // var itemsProcessed = 0;
              //
              //   ownedInvitations.forEach(function (t) {
              //       DBmodels.adventure.findOne({_id: t.adventure}, 'name -_id', function (err, targetName) {
              //           console.log("found party name " + targetName.name + " from invite " + t._id);
              //           t.adventureName = targetName.name
              //           itemsProcessed++;
              //           if(itemsProcessed === ownedInvitations.length) {
              //               callback();
              //           }
              //       })
              //
              //   })




          });
      })
  })
});

function callback() {

        res.render('index', {ownedChars: ownedChars, ownedAdventures: ownedAdventures,ownedInvitations:ownedInvitations})

}
function getAdvNamesIntoInvites(invList,onIndex,length) {
    if(onIndex<length) {
        DBmodels.adventure.findOne({_id: invList[onIndex].adventure}, 'name -_id', function (err, targetName) {
            t.adventureName = targetName.name
        })
    }else {

    }
}

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

router.post('/electchar',auth,function (req,res,next) {

    console.log("got inv ID " + req.body.invCharID)

    //ids has the inv id in [0] and the char id in [1]
    var ids = req.body.invCharID.split(',');

    DBmodels.invitation.findOne({_id:ids[0]},function (err,targetInv) {
        try {
            targetInv.character = ids[1];
            targetInv.save(function (err) {
                res.redirect('/')
            })
        }catch (err){
            console.log(err)
            res.redirect('/')

        }
    })
})

router.post('/sendinvite',auth,function (req,res,next) {
    var instance = new DBmodels.invitation
    instance.adventure = req.body.adventureID
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
