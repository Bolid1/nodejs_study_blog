var
  express = require('express'),
  Users = require('../libs/users'),
  router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  /** @var {Collection} users */
  var users = new Users.Collection();
  users.fetch({
    success: function () {
      res.render('users/list', {
        title: 'Express',
        users: users.toJSON()
      });
    },
    error: function () {
      res.send('Error in get info from database');
    }
  });
});

router.get('/add', function (req, res) {
  res.render('users/add', {title: 'Express'});
});

router.post('/create', function (req, res) {
  /** @var Model user */
  var user = new Users.Model({
    email: req.body.email
  });

  user.save(null, {
    success: function () {
      res.redirect('/users/');
    },
    error: function () {
      res.send('Error in adding info to database');
    }
  });
});

router.get('/edit/:_id', function (req, res) {
  /** @var Model user */
  var user = new Users.Model({
    _id: req.params._id
  });
  user.fetch({
    success: function () {
      res.render('users/edit', {
        title: 'Express',
        user: user.toJSON()
      });
    },
    error: function () {
      res.send('Error in get info from database');
    }
  });
});

router.post('/update/', function (req, res) {
  /** @var Model user */
  var user = new Users.Model({
    _id: req.body._id,
    email: req.body.email
  });

  user.save(null, {
    success: function () {
      res.redirect('/users/');
    },
    error: function () {
      res.send('Error in updating info in database');
    }
  });
});

router.post('/delete/', function (req, res) {
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
