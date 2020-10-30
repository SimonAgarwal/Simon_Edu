const express=require('express');
const router=express.Router();
const passport=require('passport');
const config=require('../config/database');
const jwt=require('jsonwebtoken');
const User=require('../models/users');

router.get('/',(req,res,next)=>{
    res.send("WELCOME");
})

router.post('/register',(req,res,next)=>{
let newUser=new User({
    name:req.body.name,
    email:req.body.email,
    username:req.body.username,
    password:req.body.password

})
 //check if username already exist
User.findOne({username:newUser.username},(err,founduser)=>{
    if(err){
        return res.json({success:false,msg:'Something went wrong'});
    }
  else if(founduser){
      return res.json({success:false,msg:'Username already exists'});
  }
  //if not add user
else{
    User.addUser(newUser,(err,user)=>{
   
        if(err){
               res.json({success:false,msg:'Failed To Register'});
           }else{
               res.json({success:true,msg:'Registered'})
           }
       })

  }
})
  

    
})

router.post('/authenticate',(req,res,next)=>{
const username=req.body.username;
const password=req.body.password;
User.getUserByUsername(username,(err,user)=>{
    if(err) throw err;
    if(!user){
       return res.json({success:false,msg:'User not found'});
    }
    User.comparePassword(password,user.password,(err,isMatch)=>{
        if(err) throw err;
        if(isMatch){
            const token=jwt.sign(user.toJSON(),config.secret,{
                expiresIn: 604800 //1 week             
            })

            res.json({
                success:true,
                token:'Bearer '+token,
                user:{
                    id:user._id,
                    name:user.name,
                    username:user.username,
                    email:user.email
                }
            })
        }else{
            return res.json({success:false,msg:'Wrong Password'});
        }
    })
})
})

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
res.json({user:req.user});
})

module.exports=router;