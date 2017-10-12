var express = require('express');
var auth = require('../lib/auth.js');
var DBmodels = require('../DBModels/DBmodels.js');
var router = express.Router();

/* GET home page. */
router.get('/', auth, function(req, res, next) {


    DBmodels.adventure.findOne({owner:req.session.userID, _id:req.query.advID},function (err,targetAdv) {
        DBmodels.invitation.find({adventure: targetAdv._id}).populate('character').exec(function (err, invChars) {
            res.render('gmscreen', {adventure: targetAdv, invChars: invChars});

        })
    })
});

router.post('/refresh', auth, function(req, res, next) {

    console.log(req.body.advID);
        DBmodels.invitation.find({adventure: req.body.advID}).populate('character').exec(function (err, invChars) {
            res.send(invChars)

        })


});

module.exports = router;
