var
  express = require('express'),
  Users = require('../libs/users'),
  router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (!req.user.can('view', 'users')) {
    return next();
  }
  /** @var {Collection} users */
  var users = new Users.Collection();
  users.fetch({
    success: function () {
      res.render('users/list', {
        users: users.toJSON()
      });
    },
    error: function () {
      res.send('Error in get info from database');
    }
  });
});

router.get('/add', function (req, res, next) {
  if (!req.user.can('add', 'users')) {
    return next();
  }
  res.render('users/add', {title: 'Express'});
});

router.post('/create', function (req, res, next) {
  if (!req.user.can('add', 'users')) {
    return next();
  }
  /** @var Model user */
  var user = new Users.Model({
    email: req.body.email,
    password: req.body.password
  }, {new_password: true});

  user.save(null, {
    success: function () {
      res.redirect('/users/');
    },
    error: function () {
      res.send('Error in adding info to database');
    }
  });
});

router.get('/edit/:_id', function (req, res, next) {
  if (!req.user.can('edit', 'users')) {
    return next();
  }
  // @TODO: Check can edit users with _id req.params._id
  /** @var Model user */
  var user = new Users.Model({
    _id: req.params._id
  });
  user.fetch({
    success: function () {
      res.render('users/edit', {
        edited_user: user.toJSON()
      });
    },
    error: function () {
      res.send('Error in get info from database');
    }
  });
});

router.post('/update/', function (req, res, next) {
  if (!req.user.can('edit', 'users')) {
    return next();
  }
  // @TODO: Check can edit users with _id req.body._id
  /** @var Model user */
  var user = new Users.Model({
    _id: req.body._id
  });

  user.fetch({
    success: function () {
      user.set({
        email: req.body.email
      });

      if (req.body.password) {
        user.set('password', req.body.password, {new_password: true});
      }

      user.save(null, {
        success: function () {
          res.redirect('/users/');
        },
        error: function () {
          res.send('Error in updating info in database');
        }
      });
    },
    error: function () {
      res.send('User not found');
    }
  });
});

router.post('/delete/', function (req, res, next) {
  if (!req.user.can('delete', 'users')) {
    return next();
  }
  // @TODO: Check can delete users with _id req.body._id
  /** @var Model user */
  var user = new Users.Model({
    _id: req.body._id
  });

  user.destroy({
    success: function () {
      res.redirect('/users/');
    },
    error: function () {
      res.send('Error in deleting info from database');
    }
  });
});

module.exports = router;
