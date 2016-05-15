var
  monk = require('monk'),
  url = 'localhost:27017/node_blog',
  dbInstance;

module.exports = function (key) {
  if (!dbInstance) {
    dbInstance = monk(url);
  }

  if (key === 'url') {
    return url;
  }

  if (key === 'full_url') {
    return 'mongodb://' + url;
  }

  return dbInstance;
};
