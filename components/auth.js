var
  Component,
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  db_url = require('../libs/db')('full_url'),
  /** @var Authenticator passport */
  passport = require('../libs/passport')(),
  Users = require('./../libs/users');

Component = function () {
};

Component.fillApp = function (app) {
  app.use(session({
    secret: 'Some secret key',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({url: db_url})
  }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize({}));
  app.use(passport.session({}));

  app.use(function (req, res, next) {
    if (!req.user) {
      req.user = new Users.Model();
    }

    res.locals.user = req.user;

    next();
  });
};

module.exports = Component;
