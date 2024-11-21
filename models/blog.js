const {Schema, type, default: mongoose, model}= require("mongoose");
const { schema } = require("./user");

const blogSchema = new Schema({
    Title:{
        type:String,
        required:true,
    },
    body:{
    type:String,
    required:true,
    },
    coverImg:{
        type:String,
    },
    Created_by:{
        type: Schema.Types.ObjectId,
        ref:'user',
    }
},{timestamps:true});

const Blog = model("Blog", blogSchema);
module.exports= Blog;