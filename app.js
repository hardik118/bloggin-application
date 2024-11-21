require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser= require("cookie-parser");
const {checkForAuthentication}= require("./middleware/authentication")

const Blog= require("./models/blog");


const UserRouter= require("./routers/user");
const blogRouter= require("./routers/blog");

const mongoose = require("mongoose");
const app= express();
const path= require("path");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication('token'));
app.use(express.static("./public"));




const port=  process.env.PORT ||  5000;
mongoose.connect(process.env.MONGO_URL).then(e=> console.log("mongo DB has connected"));

app.set("view engine" ,"ejs");
app.set("views", path.resolve("./views"));

app.get("/",  async (req, res)=>{
    const allBlogs= await Blog.find({});
    return res.render("home",{
        blogs:allBlogs,
        user: req.user,
    });

});

app.use("/user", UserRouter);
app.use("/blog", blogRouter);


app.listen(port, ()=>{
    console.log("the server has started");

})