var
  _ = require('underscore'),
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
  var user = new Users.Model();
  fillUserFromPOST(user, req.body);

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
  var user = new Users.Model({
    _id: req.body._id
  });

  user.fetch({
    success: function () {
      fillUserFromPOST(user, req.body);

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

/**
 * Fill user from POST request
 * @param {Users.Model} user
 * @param {object} data
 * @returns {Users.Model}
 */
function fillUserFromPOST(user, data) {
  _.each(user.get('rights'), function (rights, entity) {
    _.each(rights, function (value, action) {
      user.can(action, entity, false);
    });
  });

  _.each(data, function (value, key) {
    if (key.indexOf('rights') !== 0) {
      return;
    }

    key = key.split('_');
    if (!key[2]) {
      return;
    }

    user.can(key[2], key[1], !!value);
  });

  user.set('email', data.email);

  if (data.password) {
    user.set('password', data.password, {new_password: true});
  }

  return user;
}

module.exports = router;
