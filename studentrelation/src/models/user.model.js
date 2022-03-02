const mongoose=require("mongoose");
// user Schema and modal

const userSchema=new mongoose.Schema(
    {
        first_name:{type: String, required:true},
        last_name:{type: String, required:false},
         gender:{ type: String, required:false, default:"Male"},
         date_of_birth:{type:Number, required:true}
    },
    {
        versionKey:false,
        timestamp:true,
    },
);

module.exports=mongoose.model("user",userSchema)