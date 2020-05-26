const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const categories = require('./app/categories');
const articles = require('./app/articles');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  app.use('/users', users);
  app.use('/categories', categories);
  app.use('/articles', articles);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port}`);
  });
};

run().catch(error => {
  console.error(error);
});