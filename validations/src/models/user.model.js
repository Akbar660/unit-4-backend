const mongoose=require("mongoose");
// user Schema and modal

const userSchema=mongoose.Schema(
    {
        first_name:{type: String, required:true},
        last_name:{type: String, required:false},
        email:{type:String, required:true},
        pincode:{type:String,required:true},
        age:{type:Number,required:true},
         gender:{ type: String, required:false, default:"Male"},
       
    },
    {
        versionKey:false,
        timestamp:true,
    },
);

module.exports=mongoose.model("user",userSchema)