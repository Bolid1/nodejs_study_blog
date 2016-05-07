var
  Component,
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  saas = require('node-sass-middleware'),
  express = require('express'),
  path = require('path');

Component = function () {};

Component.fillApp = function (app) {
  var public_dir = path.join(__dirname, 'public');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(saas({
    src: public_dir,
    dest: public_dir,
    indentedSyntax: true,
    sourceMap: true
  }));
  app.use(express.static(public_dir));
};

module.exports = Component;
