var
  Component,
  /** @var Authenticator passport */
  passport = require('passport'),
  /** @var Strategy Strategy */
  Strategy = require('passport-local'),
  sessions = require('express-session'),
  Users = require('../libs/users');

Component = function () {
};

Component.initPassport = function () {
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`email` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(Strategy.name, new Strategy({},
    function (email, password, cb) {
      new Users.Model({
        email: email
      }).fetch({
        success: function () {
          if (this.isNew() || !this.validatePassword(password)) {
            cb(null, false);
            return;
          }

          cb(null, this.toJSON());
        },
        error: function (err) {
          cb(err);
        }
      });
    }
  ));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function (user, cb) {
    cb(null, user._id);
  });

  passport.deserializeUser(function (id, cb) {
    new Users.Model({
      _id: id
    }).fetch({
      success: function () {
        if (this.isNew()) {
          cb(null, false);
          return;
        }

        cb(null, this.toJSON());
      },
      error: function (err) {
        cb(err);
      }
    });
  });
};

Component.fillApp = function (app) {
  Component.initPassport();

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
