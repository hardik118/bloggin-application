const { createHmac, randomBytes } = require('crypto');
const{GenrateTokenForUser} = require("../services/auth");

const {Schema, type, default: mongoose, model}= require("mongoose");

const userSchema = new Schema({
    Fullname:{
        type: String,
        required: true,

    },
    Email:{
        type: String,
        required: true,
      
    },
    salt:{
    type: String,
   

    },
    Password:{
        type :String,
        required: true,
        unique: true,
    },
    ImgProfileUrl:{
        type: String,
        default: './imgages/default.jpg',
    },
    role:{
        type: String,
        enum:["user", "admin"],
        default:"user",

    }
},{timestamps: true});
userSchema.pre('save', function (next){
    const user = this;
    if(!user.isModified("Password")) return next();

    const salt= randomBytes(16).toString();
    const hashpassword= createHmac("sha256", salt).update(user.Password).digest('hex');
  
     this.salt= salt;
     this.Password= hashpassword;
     console.log("the user has been created");
    next();
});

userSchema.static("matchPasswordAndGenrateToken", async  function (Email,Password){
const user =  await this.findOne({Email});
if(!user)  throw new Error('User not Found') ;

const salt= user.salt;
const hashpassword= user.Password;

const userhashpassword= createHmac("sha256", salt).update(Password).digest('hex');
 if(hashpassword!==userhashpassword) throw new Error("The passoword entered is incorrect");

 const  token = GenrateTokenForUser(user);
 return token ;

});

const User= model("user",userSchema);

module.exports = User;
