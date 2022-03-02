const mongoose=require("mongoose");


const productSchema=mongoose.Schema(

{
    product_name:{type:String,required:true},
    price:{type:Number,required:true},
    colours:[{type:String,required:true}],
    usage:{type:String,required:true},

},
{
    versiokey:false,
    timestamp:true,
}


);

module.exports=mongoose.model("product",productSchema)