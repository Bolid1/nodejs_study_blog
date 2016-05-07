var
  Component,
  routes = require('../routes/index'),
  users = require('../routes/users'),
  articles = require('../routes/articles');

Component = function () {
};

Component.fillApp = function (app) {
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // production error handler
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    });
  });
};

module.exports = Component;
