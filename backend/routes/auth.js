const express=require('express');
const User=require("../models/User");
const { query, validationResult} = require('express-validator');
const router=express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET="DeepanshuisG$$db$y";

//Create a user using : POST "/api/auth/createUser". No login required doesn't require authentication"
router.post('/createUser',[
    query('name','Enter a valid name (Min 3char length)').isLength({min: 3}),
    query('email', 'Enter a valid mail').isEmail(),
    query('password', 'Password must be 5 char length').isLength({min: 5})
], async(req,res)=>{
    const result = validationResult(req);
  if (result.isEmpty()) {
    return res.json({ errors: result.array() });
  }
  
  //check whether user with email address exist 
  try{

    let user=await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: 'sorry user with this email already exists'})
    }

    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user= await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    const data={
      user:{
        id: user.id
      }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    res.json({authToken})
    // console.log(jwtData);
    // res.json(user)
  }
  catch(error){
    console.log(error.message)
    res.status(500).send("Some error occured");
  }
})

module.exports=router