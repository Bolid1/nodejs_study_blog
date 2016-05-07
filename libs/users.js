var
  Backbone = require('./backbone'),
  Users = {};

var User = Users.Model = Backbone.Model.extend({
  databaseCollection: 'users',

  query: function () {
    if (!this.isNew()) {
      return {_id: this.get(this.idAttribute)};
    } else if (this.get('email')) {
      return {email: this.get('email')};
    }

    throw new Error('Before query you must fill "_id" or "email"');
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
