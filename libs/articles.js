var
  _ = require('underscore'),
  Promise = require('promise'),
  Backbone = require('./backbone'),
  Users = require('./users'),
  Articles = {};

var Article = Articles.Model = Backbone.Model.extend({
  idAttribute: '_id',
  databaseCollection: 'articles',

  defaults: {
    created_by: null,
    updated_by: null,
    date_create: null,
    date_update: null,
    head: null,
    body: null
  },

  query: function () {
    return {_id: this.get(this.idAttribute)};
  },

  can: function (user, action) {
    if (!(user instanceof Users.Model)) {
      throw new Error('Invalid user object given');
    }

    return user.can(action, 'articles') && this.get('created_by') === user.get(user.idAttribute);
  },

  load: function (externals) {
    externals = _.values(externals);

    var promises = [];

    if (externals.indexOf('users') > -1) {
      ['created_by', 'updated_by'].forEach(_.bind(function (attr) {
        var
          self = this,
          user = new Users.Model({
            _id: this.get(attr)
          });

        promises.push(new Promise(function (resolve) {
          user.fetch({
            success: function () {
              var user_data = user.toJSON();

              self.set(attr, user_data);
              resolve(user_data);
            }
          });
        }));
      }, this));
    }

    return Promise.all(promises);
  }
});

Articles.Collection = Backbone.Collection.extend({
  model: Article,
  databaseCollection: Article.prototype.databaseCollection,
  query: function () {
    return {};
  },

  fetch: function (options) {
    options || (options = {});

    if (!options.load) {
      return Backbone.Model.prototype.fetch.apply(this, arguments);
    }

    var success = options.success;

    options.success = function (collection) {
      var promises = [];

      collection.each(function (article) {
        promises.push(article.load(options.load));
      });

      Promise.all(promises).then(function () {
        success.apply(this, arguments);
      });
    };

    return Backbone.Model.prototype.fetch.apply(this, arguments);
  }
});

module.exports = Articles;
