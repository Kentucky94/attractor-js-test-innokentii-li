const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const config = require('./config');
const User = require('./models/User');
const Category = require('./models/Category');
const Article = require('./models/Article');

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

  await Article.create({
    category: cat1,
    user: user1,
    title: 'Article 1',
    description: 'Something about tech',
    image: 'fixtures/image1.jpg'
  }, {
    category: cat2,
    user: user2,
    title: 'Article 2',
    description: 'Something about music',
    image: 'fixtures/image2.jpg'
  }, {
    category: cat3,
    user: user3,
    title: 'Article 3',
    description: 'Something about gaming',
    image: 'fixtures/image3.jpg'
  },{
    category: cat2,
    user: user1,
    title: 'Article 4',
    description: 'Something about music again',
    image: 'fixtures/image4.jpg'
  }, {
    category: cat3,
    user: user2,
    title: 'Article 5',
    description: 'Something about gaming again',
    image: 'fixtures/image5.jpg'
  }, {
    category: cat1,
    user: user3,
    title: 'Article 6',
    description: 'Something about tech again',
    image: 'fixtures/image6.jpg'
  });

  mongoose.connection.close();
};

run().catch(error => {
  mongoose.connection.close();
  throw error;
});