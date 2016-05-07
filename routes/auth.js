var
  express = require('express'),
  router = express.Router(),
  /** @var Authenticator passport */
  passport = require('../libs/passport')();

router.get('/login', function (req, res) {
  res.render('auth/form', {});
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/auth/login'}, null), function (req, res) {
  res.redirect('/');
});

router.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  }
);

module.exports = router;
