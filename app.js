var
  Components = [
    require('./components/views'),
    require('./components/auth'),
    require('./components/miscaleouns'),
    require('./components/date'),
    require('./components/routes'),
    require('./components/errors')
  ],
  express = require('express'),
  app = express(),
  Backbone = require('./libs/backbone'),
  db = require('./libs/db')();

Backbone.db = db;

Components.forEach(function (component) {
  component.fillApp(app);
});

module.exports = app;
