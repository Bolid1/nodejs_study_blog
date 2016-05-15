var
  Component,
  moment = require('moment');

Component = function () {};

Component.initMoment = function () {
  moment.defaultFormat = 'DD-MM-YYYY HH:mm:ss';

  return moment;
};

Component.fillApp = function (app) {
  app.locals.moment = Component.initMoment();
};

module.exports = Component;
