const { model } = require("mongoose");
const {validateToken}=require("../services/auth");

function checkForAuthentication(cookiename){
    return (req, res, next)=>{
    const tokenCookieValue= req.cookies[cookiename];
    if(!tokenCookieValue){
        return next();
    }
    try {
        const userpayload= validateToken(tokenCookieValue);
        req.user= userpayload;

    } catch (error) {
        
    }
    return next();
    }
}
module.exports={
    checkForAuthentication,
}