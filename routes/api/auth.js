const express= require('express');
const auth = express.Router();
const token_auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

auth.get('/',token_auth,async (req,res) =>{
      try{
        const user = await User.findById(req.user.id).select('-password');
        res.json({data:user});
      }
      catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
      }

      res.send("Auth Loaded")

});

auth.post('/',[
  check('email','Enter Email properly').isEmail(),
  check('password','Password required').exists()
],async (req,res) =>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    res.status(400).json({message:errors.array()});
  }
  else{
    const {email,password} = req.body;

    try {
    let user= await User.findOne({email});
    if(!user){
      res.status(400).json({errors:[{msg:'Incorrect Credentials'}]})
    }

    const match = await bcrypt.compare(password,user.password);

    if (!match) {
      res.status(400).json({errors:[{msg:'Incorrect password'}]})
    }
    else{
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
      })
    }
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
}
});

module.exports = auth;
