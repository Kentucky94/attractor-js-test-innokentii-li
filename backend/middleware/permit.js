const permit = (...roles) => {
  return (req, res, next) => {
    if(!req.user) return res.status(400).send({error: 'User not found'});

    if(roles.includes(req.user.role)){
      return next();
    }else{
      return res.status(403).send({error: 'Not permitted'})
    }
  };
};

module.exports = permit;