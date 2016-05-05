var
  express = require('express'),
  router = express.Router();

/* GET articles listing. */
router.get('/', function (req, res, next) {
  res.render('articles/list', {title: 'Express'});
});

router.get('/add', function (req, res, next) {
  res.render('articles/add', {title: 'Express'});
});

router.post('/create', function (req, res, next) {
  res.redirect('/articles/add');
});

module.exports = router;
