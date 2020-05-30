const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {nanoid} = require('nanoid');

const Article = require('../models/Article');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const config = require('../config');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

// create new article

router.post('/', [auth, permit('user', 'admin'), upload.single('image')], async (req, res) => {
  try{
    const articleData = {
      category: req.body.category,
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
    };

    if(req.file){
      articleData.image = req.file.filename;
    }

    const article = new Article(articleData);

    await article.save();

    return res.send(article);
  }catch(error){
    return res.status(400).send(error);
  }
});

// find all articles

router.get('/', async (req, res) => {
  try{
    const articles = await Article.find().populate({path: 'user category', select: ['username', 'title']});

    return res.send(articles);
  }catch(error){
    return res.status(400).send(error);
  }
});

// edit an article

router.patch('/:id', [auth, permit('admin'), upload.single('image')], async (req, res) => {
  try{
    const article = await Article.findById(req.params.id);

    if(!article) return res.status(400).send({error: 'No such article'});

    if(req.body.category){
      article.category = req.body.category;
    }

    if(req.body.title){
      article.title = req.body.title;
    }

    if(req.body.description){
      article.description = req.body.description;
    }

    if(req.file){
      try{
        await fs.promises.unlink(config.uploadPath + '/' + article.image);
      }catch(error){
        // nothing
      }

      article.image = req.file.filename;
    }

    await article.save();

    return res.send(article)
  }catch(error){
    return res.status(400).send(error);
  }
});

// delete an article

router.delete('/', [auth, permit('admin')], async (req, res) => {
  try{
    const article = await Article.findById(req.params.id);

    if(!article) return res.status(400).send({error: 'No such article'});

    await Article.deleteOne({_id: req.params.id});

    return res.send({message: "A category has been deleted"});
  }catch(error){
    return res.status(400).send(error);
  }
});

module.exports = router;