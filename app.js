var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const authentication = require('./middleware/authentication').authentication;

//var indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather');
const signUpRouter = require('./routes/signUp');
const signInRouter = require('./routes/signIn');
const signOutRouter = require('./routes/signOut');
const deleteAccountRouter = require('./routes/deleteAccount');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authentication);

//app.use('/', indexRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/signin', signInRouter);
app.use('/api/signout', signOutRouter);
app.use('/api/deleteaccount', deleteAccountRouter);

// redirect to / for any other requests
app.use((req, res, next) => {
  res.redirect('/');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;