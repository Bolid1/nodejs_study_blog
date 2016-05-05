var
  express = require('express'),
  router = express.Router();

/* GET articles listing. */
router.get('/', function (req, res, next) {
  /** @var {Collection} collection */
  var collection = req.db.get('articles');

  collection.find({}, {}, function (err, doc) {
    if (err) {
      console.log(err);
      res.send('Error in get info from database');
    } else {
      res.render('articles/list', {
        title: 'Express',
        articles: doc.map(function (article) {
          return {
            id: article._id,
            head: article.head,
            body: article.body
          };
        })
      });
    }
  });
});

router.get('/add', function (req, res, next) {
  res.render('articles/add', {title: 'Express'});
});

router.get('/edit/:id', function (req, res, next) {
  /** @var {Collection} collection */
  var collection = req.db.get('articles');

  collection.findById(req.params.id, {}, function (err, article) {
    if (err) {
      console.log(err);
      res.send('Error in get info from database');
    } else {
      res.render('articles/edit', {
        title: 'Express',
        article: {
          id: article._id,
          head: article.head,
          body: article.body
        }
      });
    }
  });
});

router.post('/create', function (req, res, next) {
  /** @var {Collection} collection */
  var collection = req.db.get('articles');

  collection.insert({
    head: req.body.head,
    body: req.body.body
  }, {}, function (err, doc) {
    if (err) {
      console.log(err);
      res.send('Error in adding info to database');
    } else {
      res.redirect('/articles/add');
    }
  });
});

module.exports = router;
