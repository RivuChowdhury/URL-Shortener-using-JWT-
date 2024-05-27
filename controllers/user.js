const User=require('../models/user')
const path=require('path');
const {setUser}=require('../service/auth')

async function handleUserSignUp(req,res){
    const {name, email ,password}=req.body;
    await User.create({
        name,
        email,
        password,
    })
    //return res.render(path.join(__dirname,'../views/home'));
    return res.redirect('/');
}

async function handleUserLogin(req,res){
    const {email, password}=req.body;
    const result=await User.findOne({email,password});
    if(!result){
        return res.render(path.join(__dirname,'../views/login'),{error:'Invalid email or password'})
    }

    const token=setUser(result);
    res.cookie("uid",token);
    return res.redirect("/");
}

module.exports={
    handleUserSignUp,
    handleUserLogin,
}