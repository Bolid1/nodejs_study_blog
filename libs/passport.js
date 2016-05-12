var
  /** @var Authenticator passport */
  passport,
  /** @var Strategy Strategy */
  Strategy = require('passport-local'),
  Users = require('./users');

module.exports = function () {
  if (!passport) {
    initPassport();
  }

  return passport;
};

var initPassport = function () {
  passport = require('passport');
  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`email` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use('local', new Strategy({usernameField: 'email'},
    function (email, password, cb) {
      var user = new Users.Model({
        email: email
      });

      user.fetch({
        success: function () {
          if (user.isNew() || !user.validatePassword(password)) {
            cb(null, false);
            return;
          }

          cb(null, user.toJSON());
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
    var user = new Users.Model({
      _id: id
    });

    user.fetch({
      success: function () {
        if (user.isNew()) {
          cb(null, false);
          return;
        }

        cb(null, user);
      },
      error: function (err) {
        cb(err);
      }
    });
  });
};
