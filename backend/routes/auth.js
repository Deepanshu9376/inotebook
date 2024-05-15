const express=require('express');
const User=require("../models/User");
const { query, validationResult} = require('express-validator');
const router=express.Router();

//Create a user using : POST "/api/auth/". doesn't require authentication"
router.post('/',[
    query('name','Enter a valid name (Min 3char length)').isLength({min: 3}),
    query('email', 'Enter a valid mail').isEmail(),
    query('password', 'Password must be 5 char length').isLength({min: 5})
],(req,res)=>{
    const result = validationResult(req);
  if (result.isEmpty()) {
    return res.json({ errors: result.array() });
  }
  User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  }).then(user=>res.json(user))
  .catch(err=>{console.log(err)
  res.json({err: 'Please enter a unique email', message: err.message})});
})

module.exports=router