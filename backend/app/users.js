const express = require('express');

const User = require('../models/User');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

// find all users

router.get('/', [auth, permit('admin')], async (req, res) => {
  try{
    const users = await User.find({}, 'username role');

    return res.send(users);
  }catch(error){
    return res.status(400).send(error);
  }
});

// find user by id

router.get('/:id', async (req, res) => {
  try{
    const user = await User.findById(req.params.id, 'username role');

    return res.send(user);
  }catch(error){
    return res.status(400).send(error);
  }
});

// register new user

router.post('/', async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };

    const user = new User(userData);

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//  login a user

router.post('/sessions', async (req, res) => {
  try{
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send({error: 'Username or password not correct!'});

    const isMatch = await user.comparePasswords(req.body.password);
    if (!isMatch) return res.status(400).send({error: 'Username or password not correct!'});

    user.generateToken();
    await user.save();

    return res.send(user);
  }catch(error){
    return res.status(400).send(error);
  }
});

// logout a user

router.delete('/sessions', async (req, res) => {
  const success = {message: 'Success'};

  try{
    const token = req.get('Authorization').split(' ')[1];
    if(!token) return res.send(success);

    const user = await User.findOne({token});
    if(!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  }catch(error){
    return res.status(400).send(error);
  }
});

// edit user

router.patch('/:id', [auth, permit('admin')], async (req, res) => {
  try{
    const user = await User.findById(req.user._id);

    if(!user) return res.status(400).send({error: 'No such user'});

    if(req.body.username){
      user.username = req.body.username;
    }

    if(req.body.password){
      user.password = req.body.password;
    }

    await user.save();

    return res.send(user)
  }catch(error){
    return res.status(400).send(error);
  }
});

// delete a user

router.delete('/:id', [auth, permit('admin'), async (req, res) => {
  try{
    const user = await User.findById(req.user._id);

    if(!user) return res.status(400).send({error: 'No such user'});

    await User.deleteOne({_id: req.params.id});

    return res.send({message: 'User has been deleted'})
  }catch(error){
    return res.status(400).send(error);
  }
}]);



module.exports = router;