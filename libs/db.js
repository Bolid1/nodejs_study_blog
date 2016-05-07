var
  monk = require('monk'),
  dbInstance;

if (!dbInstance) {
  dbInstance = monk('localhost:27017/node_blog');
}

module.exports = dbInstance;
