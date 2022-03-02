
const mongoose=require("mongoose");

const studentSchema=mongoose.Schema(
    {
        roll_id:{type:String, required: true},
        current_batch:{type: String, required:false,default:"web13"},
        marks:{type:Number, required: true},
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        evolution_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"evolution",
            required:true,
        },

    },
    {

        versionKey:false,
        timestamp:true,
        
    }
    
)

module.exports=mongoose.model("student",studentSchema)