
const mongoose=require("mongoose");


const evolutionSchema=mongoose.Schema(
     
    {
        date_of_evaluation:{type:String, required:false, default:"12-2-2021"},
        instructor:{type:String, required:true},
        topic_name:{type:String, required:true},
    
    },
    {
    versionKey:false,
    timestamp:true,
   }

);

module.exports=mongoose.model("evolution",evolutionSchema)