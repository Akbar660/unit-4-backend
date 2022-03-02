
const mongoose=require("mongoose");
// user Schema and modal

const userSchema=mongoose.Schema(
    {
        first_name:{type: String, required:true},
        last_name:{type: String, required:false},
        img_urls:[{type: String,required:true}]
       
    },
    {
        versionKey:false,
        timestamp:true,
    },
);

module.exports=mongoose.model("user",userSchema)