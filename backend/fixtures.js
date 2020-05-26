const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const config = require('./config');
const User = require('./models/User');
const Category = require('./models/Category');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for(let coll of collections){
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user1, user2, user3] = await User.create({
    username: 'user1',
    password: 'password1',
    token: nanoid(),
    role: 'admin',
  }, {
    username: 'user2',
    password: 'password2',
    token: nanoid(),
  }, {
    username: 'user3',
    password: 'password3',
    token: nanoid(),
  });

  const [cat1, cat2, cat3] = await Category.create({
    title: 'Technology'
  }, {
    title: 'Music'
  }, {
    title: 'Gaming'
  });

  mongoose.connection.close();
};

run().catch(error => {
  mongoose.connection.close();
  throw error;
});