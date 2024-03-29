//var createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');

const cfg = require('./config.js');

const authentication = require('./middleware/authentication').authentication;

const weatherRouter = require('./routes/weather');
const signUpRouter = require('./routes/signUp');
const signInRouter = require('./routes/signIn');
const signOutRouter = require('./routes/signOut');
const deleteAccountRouter = require('./routes/deleteAccount');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// nginx proxy required
app.enable('trust proxy');

// development and accessLogging setup
app.use(logger('dev'));
const morganLogWriteStream = fs.createWriteStream(path.join(__dirname, cfg.accessesWithErrorsLog), { flags: 'a' });
app.use(logger('combined', {
  skip: (req, res) => res.statusCode < 400,
  stream: morganLogWriteStream
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authentication);

app.use('/oauthsignin', (req, res, next) => {
  res.render('oauthsignin.ejs');
});
app.use('/api/weather', weatherRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/signin', signInRouter);
app.use('/api/signout', signOutRouter);
app.use('/api/deleteaccount', deleteAccountRouter);

// redirect to / for any other requests
app.use((req, res, next) => {
  res.redirect('/');
});

// handle and log errors
let errorsStream;
try {
  errorsStream = fs.createWriteStream(path.join(__dirname, cfg.errorsLog), { flags: 'a' })
} catch (err) {
  console.error(err.message);
}
app.use(function (err, req, res, next) {
  if (errorsStream) errorsStream.write(new Date().toUTCString() + ` ${err.message}\n Error stack:\n ${err.stack}\n`);

  res.status(500).json({
    code: 500,
    msg: 'Internal server error'
  });
});

module.exports = app;
