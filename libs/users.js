var
  Backbone = require('./backbone'),
  monk = require('monk'),
  Users = {};

var User = Users.Model = Backbone.Model.extend({
  databaseCollection: 'users',

  query: function () {
    if (!this.isNew()) {
      return {_id: this.get(this.idAttribute)};
    } else if (this.get('username')) {
      return {username: this.get('username')};
    }

    throw new Error('Before query you must fill "_id" or "username"');
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
