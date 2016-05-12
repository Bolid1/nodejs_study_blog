var
  express = require('express'),
  Articles = require('../libs/articles'),
  router = express.Router();

/* GET articles listing. */
router.get('/', function (req, res) {
  /** @var {Collection} articles */
  var articles = new Articles.Collection();
  articles.fetch({
    success: function () {
      res.render('articles/list', {
        articles: articles.toJSON()
      });
    },
    error: function () {
      res.send('Error in get info from database');
    }
  });
});

router.get('/add', function (req, res, next) {
  if (!req.user.can('add', 'articles')) {
    return next();
  }

  res.render('articles/add', {title: 'Express'});
});

router.post('/create', function (req, res, next) {
  if (!req.user.can('add', 'articles')) {
    return next();
  }

  /** @var Model article */
  var article = new Articles.Model({
    head: req.body.head,
    body: req.body.body
  });

  article.save(null, {
    success: function () {
      res.redirect('/articles/');
    },
    error: function () {
      res.send('Error in adding info to database');
    }
  });
});

router.get('/edit/:_id', function (req, res, next) {
  if (!req.user.can('edit', 'articles')) {
    return next();
  }
  // @TODO: Check can edit article with _id req.params._id

  /** @var Model article */
  var article = new Articles.Model({
    _id: req.params._id
  });
  article.fetch({
    success: function () {
      res.render('articles/edit', {
        article: article.toJSON()
      });
    },
    error: function () {
      res.send('Error in get info from database');
    }
  });
});

router.post('/update/', function (req, res) {
  if (!req.user.can('edit', 'articles')) {
    return next();
  }
  // @TODO: Check can edit article with _id req.body._id
  /** @var Model article */
  var article = new Articles.Model({
    _id: req.body._id,
    head: req.body.head,
    body: req.body.body
  });

  article.save(null, {
    success: function () {
      res.redirect('/articles/');
    },
    error: function () {
      res.send('Error in updating info in database');
    }
  });
});

router.post('/delete/', function (req, res) {
  if (!req.user.can('delete', 'articles')) {
    return next();
  }
  // @TODO: Check can delete article with _id req.body._id
  /** @var Model article */
  var article = new Articles.Model({
    _id: req.body._id
  });

  article.destroy({
    success: function () {
      res.redirect('/articles/');
    },
    error: function () {
      res.send('Error in deleting info from database');
    }
  });
});

module.exports = router;
