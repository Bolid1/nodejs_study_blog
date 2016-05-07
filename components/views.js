var
  Component,
  path = require('path');

Component = function () {};

Component.fillApp = function (app) {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
};

module.exports = Component;
