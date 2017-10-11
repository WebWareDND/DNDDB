var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');


var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var dashboard = require('./routes/dashboard');
var users = require('./routes/users');
var charinput = require('./routes/charinput');
var gmscreen = require('./routes/gmscreen');
var fullcharedit = require('./routes/fullcharedit');
var logout = require('./routes/logout');

var app = express();
//====================== DB STUFF =============================
mongoose.connect('mongodb://alpha:omega@ds113785.mlab.com:13785/dnddb');
var DBmodels = require('./DBModels/DBmodels.js');
// DBmodels.invitation.findOne({},function (err,targetInv) {
//     DBmodels.adventure.findOne({_id:targetInv.adventure},'name -_id',function (err,targetName) {
//         try {
//             console.log("found party name " + targetName.name + " from invite " + targetInv._id);
//         }catch (err){
//             console.log(err)
//         }
//     })
// })

//==============================================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'server-session-cookie-id',
    secret: 'fdasklkjlh',
    saveUninitialized: true,
    resave: true,
    // store: new FileStore()
}));



app.use('/', index);
app.use('/dashboard', dashboard);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
app.use('/gmscreen', gmscreen);
app.use('/charinput', charinput);
app.use('/fullcharedit', fullcharedit);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,function(){
  console.log("listening on 3000");
});

module.exports = app;
