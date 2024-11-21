const {Router}= require("express");
const User= require("../models/user");

const router= Router();

router.get("/singup", (req, res)=>{
    return res.render("singup");

});
router.get("/singin", (req, res)=>{
    return res.render("singin");
    
});

router.get("/logout", ( req, res)=>{
     res.clearCookie('token').redirect("/");
})

router.post("/singin", async  (req, res)=>{
    const {Email, Password}= req.body;
    try{
    const token = await User.matchPasswordAndGenrateToken(Email, Password);
    return res.cookie('token',token).redirect("/");
    }catch(error){
        return res.render("singin", {
            error:"Incorrect Email or Password",
        })
    }
})

router.post("/singup", async  (req,  res)=>{
 const  {Fullname,Email,Password }= req.body;
await User.create({
    Fullname,
    Email,
    Password,
})
return res.redirect("/");
})


module.exports= router;
