var
  Component,
  sessions = require('express-session'),
  /** @var Authenticator passport */
  passport = require('../libs/passport')(),
  Users = require('./../libs/users');

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

  app.use(function (req, res, next) {
    if (!(req.user && req.user._id)) {
      next();
      return;
    }

    var user = new Users.Model({
      _id: req.user._id
    });

    user.fetch({
      success: function () {
        if (!user.isNew()) {
          res.locals.user = user.toJSON();
        }

        next();
      },
      error: function () {
        next();
      }
    });
  });
};

module.exports = Component;
