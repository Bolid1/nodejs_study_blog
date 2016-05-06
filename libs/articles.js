var
  Backbone = require('./backbone'),
  monk = require('monk'),
  Articles = {};

Articles.Model = Backbone.Model.extend({
  idAttribute: '_id',
  databaseCollection: 'articles',

  query: function () {
    return {_id: this.get(this.idAttribute)};
  }
});

module.exports = Articles;
