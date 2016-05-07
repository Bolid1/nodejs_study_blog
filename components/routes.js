var
  Component,
  routes = require('../routes/index'),
  users = require('../routes/users'),
  articles = require('../routes/articles');

Component = function () {};

Component.fillApp = function (app) {
  app.use('/', routes);
  app.use('/users', users);
  app.use('/articles', articles);
};

module.exports = Component;
