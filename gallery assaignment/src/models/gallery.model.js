
const mongoose=require("mongoose");
// user Schema and modal

const gallerySchema=mongoose.Schema(
    {
       
     gallery_pics:[{type: String,required:true}],
     user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
       
    },
    {
        versionKey:false,
        timestamp:true,
    },
);

module.exports=mongoose.model("gallery",gallerySchema)