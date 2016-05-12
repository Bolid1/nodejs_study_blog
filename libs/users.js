var
  Backbone = require('./backbone'),
  Users = {};

var User = Users.Model = Backbone.Model.extend({
  databaseCollection: 'users',

  defaults: {
    rights: {
      can_add_articles: false,
      can_add_users: false,
      can_view_users: false
    }
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
