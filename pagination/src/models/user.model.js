const mongoose=require("mongoose");


const userSchema=mongoose.Schema(

{
    first_name:{type:String,required:true},
    last_name:{type: String, required:true},
    email:{type:String,required:true}
},
{
    
        versionKey:false,
        timestamp:true,
       
    
}

);

module.exports=mongoose.model("user",userSchema)