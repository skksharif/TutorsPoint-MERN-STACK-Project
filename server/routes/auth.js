const express= require('express')
const router=express.Router()
const mongoose=require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = mongoose.model("User")
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')



router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body
    if(!password || !email || !name){
      return  res.status(422).json({error:"pleaase fill all fields"})
    }
  
   User.findOne({email:email})
   .then((savedUser)=>{    
      if(savedUser){
         return res.status(422).json({error:"user already exist"})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
        const user=new User({
          email:email,
          password:hashedpassword,
          name:name
        })
     

      user.save()
      .then(user=>{
        res.json({message:"saved successfully"})
      })
    })

   })
   .catch(err=>{
    console.log(err)
  })
   
})

router.post('/signin',(req,res)=>{
    
    const {email,password} =req.body
    if(!email || !password){
      return res.status(422).json({error:"please enter email&password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
      if(!savedUser){
        return res.status(422).json({error:"please enter email&password"})
      }
      //password verification
      bcrypt.compare(password,savedUser.password)
      .then(doMatch=>{
        if(doMatch){
          const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
          const {_id,name,email} = savedUser
          res.json({token,user:{_id,name,email}})
        }
        else{
          return res.status(422).json({error:"invalid password"})
        }
      })
      .catch(err=>{
        console.log(err)
      })
    })
})

module.exports=router