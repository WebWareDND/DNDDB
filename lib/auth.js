function auth (req, res, next) {
    if(!req.session.username){
        return res.redirect('/login')
    }else{
        return next();
    }
}

module.exports = auth;