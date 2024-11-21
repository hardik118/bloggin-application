const{Schema , model}= require("mongoose");
const commentSchema= new Schema({
    comment:{
        type:String,
        required:true,
    },
    blogId:{
    type:Schema.Types.ObjectId,
    ref:'blog',
    },
    Created_by:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
},{timestamps:true});

const comment= model("commnet",commentSchema);
module.exports= comment;

