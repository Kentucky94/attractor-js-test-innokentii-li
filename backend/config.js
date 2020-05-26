const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  port: 8080,
  uploadPath: path.join(rootPath, 'public', 'uploads'),
  database: 'mongodb://localhost/js-test',
  databaseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};