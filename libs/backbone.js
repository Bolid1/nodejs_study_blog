var
  _ = require('underscore'),
  Backbone = require('backbone'),
  db = require('monk')('localhost:27017/node_blog');
// @TODO: db.close()

Backbone.sync = function (method, model, options) {
  // Default options, unless specified.
  _.defaults(options || (options = {}));

  // Default JSON-request options.
  var params = {};

  // Ensure we have database collection
  if (!options.databaseCollection) {
    params.databaseCollection = _.result(model, 'databaseCollection') || throwError('A "databaseCollection" property or function must be specified');
  }

  // Ensure that we have the appropriate request data.
  if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
    params.data = options.attrs || model.toJSON(options);
  }

  // Ensure that we have the appropriate request data.
  if (options.query == null && model && (method === 'read' || method === 'delete' || method === 'update')) {
    params.query = options.query || _.result(model, 'query') || throwError('A "query" property or function must be specified');
  }

  var error = options.error;
  options.error = function (err) {
    /** @var {Error} err */
    options.textStatus = err.message;
    if (error) {
      error.call(options.context, err, options);
    }
  };

  var onResult = function (err, doc) {
    if (err) {
      options.error(err);
    } else if (_.isFunction(options.success)) {
      options.success(doc);
    }
  };

  /**
   * @var Collection collection
   */
  var collection = db.get(params.databaseCollection);
  // Make the request, allowing the user to override any request options.
  var action, promise;
  switch (method) {
    case 'read':
      action = (model instanceof Backbone.Model) ? 'findOne' : 'find';
      promise = collection[action](params.query, options, onResult);
      break;
    case 'create':
      promise = collection.insert(params.data, options, onResult);
      break;
    case 'update':
      promise = collection.update(params.query, params.data, options, onResult);
      break;
    case 'delete':
      promise = collection.remove(params.query, options, onResult);
      break;
    default:
      throwError('Method must be one of "read", "create", "update" or "delete"');
      break;
  }

  model.trigger('request', model, promise, options);

  return promise;
};

var throwError = function (message) {
  throw new Error(message);
};

module.exports = Backbone;
