var
  _ = require('underscore'),
  Backbone = require('./backbone'),
  Users = {};

var User = Users.Model = Backbone.Model.extend({
  databaseCollection: 'users',

  defaults: {
    rights: {
      articles: {
        'add': false,
        'edit': false,
        'delete': false
      },
      users: {
        'view': false,
        'add': false,
        'edit': false,
        'delete': false
      }
    }
  },

  save: function (key, val, options) {
    // Handle both `"key", value` and `{key: value}` -style arguments.
    if (key == null || typeof key === 'object') {
      options = val;
    }

    options.attrs = _.clone(this.attributes);

    Backbone.Model.prototype.save.call(this, key, val, options);
  },

  can: function (action, entity, value) {
    var rights = this.get('rights');

    if (!rights) {
      return false;
    }

    if (!rights[entity]) {
      throw new Error('Entity "%s" not exist in rights'.replace('%s', entity));
    }

    if (typeof rights[entity][action] === 'undefined') {
      throw new Error('Right "%s" not exist in rights of entity "%s"'.replace('%s', action).replace('%s', entity));
    }

    if (typeof value !== 'undefined') {
      rights[entity][action] = !!value;
    }

    return rights[entity][action];
  },

  query: function () {
    if (!this.isNew()) {
      return {_id: this.get(this.idAttribute)};
    } else if (this.get('email')) {
      return {email: this.get('email')};
    }

    throw new Error('Before query you must fill "_id" or "email"');
  },

  validatePassword: function (password) {
    // @TODO: Implement this method

    return true;
  },

  /**
   * @protected
   * @returns string|boolean
   */
  validate: function () {
    if (!this.get('email')) {
      return 'Empty email';
    }

    // @TODO: Check email
    if (!this.get('password')) {
      return 'Empty password';
    }

    return false;
  }
});

Users.Collection = Backbone.Collection.extend({
  model: User,
  databaseCollection: User.prototype.databaseCollection,
  query: function () {
    return {};
  }
});

module.exports = Users;
