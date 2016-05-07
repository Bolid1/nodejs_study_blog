var
  Components = [
    require('./components/views'),
    require('./components/miscaleouns'),
    require('./components/routes'),
    require('./components/errors')
  ],
  express = require('express'),
  app = express();

Components.forEach(function (component) {
  component.fillApp(app);
});

module.exports = app;
