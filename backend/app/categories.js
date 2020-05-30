const express = require('express');

const Category = require('../models/Category');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

// create a category

router.post('/', async (req, res) => {
  try{
    const categoryData = {
      title: req.body.title,
    };

    if(categoryData.title.length <= 2) return res.status(400).send({errors: {title: {message: 'Category title is too short'}}});

    const category = new Category(categoryData);

    await category.save();

    return res.send(category);
  }catch(error){
    return res.status(400).send(error);
  }
});

// get all categories

router.get('/', async (req, res) => {
  try{
    const categories = await Category.find();

    return res.send(categories);
  }catch(error){
    return res.status(400).send(error);
  }
});

// get category by id

router.get('/:id', async (req, res) => {
  try{
    const category = await Category.findById(req.params.id);

    return res.send(category);
  }catch(error){
    return res.status(400).send(error);
  }
});

// edit category

router.patch('/:id', async (req, res) => {
  try{
    const category = await Category.findById(req.params.id);

    if(!category) return res.status(400).send({error: 'No such category'});

    if(req.body.title){
      category.title = req.body.title;
    }

    if(category.title.length <= 2) return res.status(400).send({errors: {title: {message: 'Category title is too short'}}});

    await category.save();

    return res.send(category);
  }catch(error){
    return res.status(400).send(error);
  }
});

// delete a category

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try{
    const category = await Category.findById(req.params.id);

    if(!category) return res.status(400).send({error: 'No such category'});

    await Category.deleteOne({_id: req.params._id});

    return res.send({message: "A category has been deleted"});
  }catch(error){
    return res.status(400).send(error);
  }
});

module.exports = router;