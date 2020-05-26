const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Category',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  image: String,
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;