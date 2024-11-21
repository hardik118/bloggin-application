const {Router}= require("express");
const multer= require("multer");
const path = require("path");

const User= require("../models/user");
const Blog= require("../models/blog");
const comment= require("../models/comments");



const router= Router();

const storage= multer.diskStorage({
    destination: function( req, file, cb){
        cb(null, path.resolve(`./public/uploads`));
        
    },
    filename: function( req, file, cb){
        const filename= `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const uploads= multer({storage:storage});

router.get("/add-new", (req, res)=>{
    return res.render("addblog", {
        user: req.user,
    });
});

router.get("/:id", async( req, res)=>{
    const blogcontent= await Blog.findById(req.params.id).populate("Created_by");
    const comments= await comment.find({blogId:req.params.id}).populate("Created_by");
    return res.render("ReadBlogs", {
       comments,
       blog: blogcontent,
       user:req.user,
    })

})
router.post("/comment/:blogid", async ( req, res)=>{
    await comment.create({
        comment:req.body.content,
        blogId:req.params.blogid,
        Created_by:req.user._id,
    })
    console.log(req.body);
return res.redirect(`/blog/${req.params.blogid}`);
})

router.post("/", uploads.single('coverImg') ,(req, res)=>{
    const{ Title, body}=req.body;
   const blog= Blog.create({
    Title:Title,
    body:body,
    coverImg:`/uploads/${req.file.filename}`,
    Created_by:req.user._id,
   })
   return res.redirect("/blog/{blog._id");

});


module.exports= router;
