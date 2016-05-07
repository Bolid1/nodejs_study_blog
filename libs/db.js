var
  monk = require('monk'),
  dbInstance;

module.exports = function () {
  if (!dbInstance) {
    dbInstance = monk('localhost:27017/node_blog');
  }

  return dbInstance;
};
