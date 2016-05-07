var
  Backbone = require('./backbone'),
  Articles = {};

var Article = Articles.Model = Backbone.Model.extend({
  idAttribute: '_id',
  databaseCollection: 'articles',

  query: function () {
    return {_id: this.get(this.idAttribute)};
  }
});

Articles.Collection = Backbone.Collection.extend({
  model: Article,
  databaseCollection: Article.prototype.databaseCollection,
  query: function () {
    return {};
  }
});

module.exports = Articles;
