const JWT= require("jsonwebtoken");
const secret= "randomByte2005@" ;

function GenrateTokenForUser(user){
    const payload={
        _id:user._id,
        Email: user.Email,
        ImgProfileUrl:user.ImgProfileUrl,
        role:user.role,

    }
    const token = JWT.sign(payload, secret);
    return token;
}
function validateToken(token){
    const payload= JWT.verify(token, secret);
    return payload;
}

module.exports={
    GenrateTokenForUser,
    validateToken
}