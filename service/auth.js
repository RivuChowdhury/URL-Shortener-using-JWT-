const jwt=require("jsonwebtoken");
const secret="Rivu@1234#$"

function setUser(user){
    const payload={
        _id:user._id,
        email:user.email,
    }
    //expriesIn is used to expire the jwt token in the cookie after a certain period of time.
    //Here 30 means 30 minutes.
    return jwt.sign(payload,secret,{expiresIn:30})
}

function getUser(token){
    if(!token){
        return null;
    }
    try{
        return jwt.verify(token,secret);
    }
    catch(error){
        return null;
    }

}

module.exports={
    setUser,
    getUser,
}