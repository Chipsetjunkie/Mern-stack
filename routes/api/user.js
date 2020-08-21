const express= require('express');
const user = express.Router();
const {check,validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
//@route POST api/user
//@desc Register user
//@access Public

user.post('/',[
  check('name','enter name field').not().isEmpty(),
  check('email','Enter Email properly').isEmail(),
  check('password','Enter password of length 6').isLength({min:6})
],async (req,res) =>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    res.status(400).json({errors:errors.array()});
  }
  else{
    const {name,email,password} = req.body;

    try {
    let user= await User.findOne({email});
    if(user){
      res.status(400).json({errors:[{msg:'User already exists'}]})
    }
    else{
    const avatar = gravatar.url(email,{
      s:'200',
      r:'pg',
      d:'mm'
    })

    user = new User({
      name,
      email,
      avatar,
      password
    });



    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password,salt)

    await user.save()

    const payload = {
      user:{
        id:user.id
      }
    }

    jwt.sign(payload,
      config.get('jwttoken'),
      {expiresIn:360000},
      (err,token) => {
        if (err) throw err;
        res.json({token})
      }

    )
  }
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
}
});

module.exports = user;
