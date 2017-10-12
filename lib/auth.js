function auth (req, res, next) {
    if(!req.session.username){
        return res.redirect('/truelogin')
    }else{
        return next();
    }
}

module.exports = auth;