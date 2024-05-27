const express=require("express");
const router=express.Router();
//const mongoose=require('mongoose');
const URL=require('../models/url');
const path=require('path');

router.get('/',async(req,res)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    //const allURL = await URL.find({ createdBy: req.user._id });
    const allURL=await URL.find({});
    return res.render(path.join(__dirname,'../views/home'),{urls:allURL});
})

router.get('/signup',async(req,res)=>{
    return res.render(path.join(__dirname,'../views/signup'))
})

router.get('/login',async(req,res)=>{
    return res.render(path.join(__dirname,'../views/login'))
})

module.exports=router;