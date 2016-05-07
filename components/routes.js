var
  Component,
  routes = require('../routes/index'),
  users = require('../routes/users'),
  articles = require('../routes/articles'),
  auth = require('../routes/auth');

Component = function () {};

Component.fillApp = function (app) {
  app.use('/', routes);
  app.use('/users', users);
  app.use('/articles', articles);
  app.use('/auth', auth);
};

module.exports = Component;
