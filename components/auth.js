var
  Component,
  sessions = require('express-session'),
  /** @var Authenticator passport */
  passport = require('../libs/passport')();

Component = function () {
};

Component.fillApp = function (app) {
  app.use(sessions({
    secret: 'Some secret key',
    resave: false,
    saveUninitialized: false
  }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize({}));
  app.use(passport.session({}));
};

module.exports = Component;
