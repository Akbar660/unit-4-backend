const express=require("express");

const Product=require("../models/product.model");

const router=express.Router();

router.post("",async(req,res)=>{

try{

    const product=await Product.create(req.body);
    return res.status(201).send(product);
}catch (err){
    return res.status(500).send(err.message);
}


});

router.get("",async(req,res)=>{

    try{
    
        const product=await Product.find().lean().exec();
        return res.status(201).send(product);
    }catch (err){
        return res.status(500).send(err.message);
    }
    
    
 });

    router.delete("/:id",async(req,res)=>{

        try{
        
            const product=await Product.findByIdAndDelete(req.params.id).lean().exec();
            return res.status(201).send(product);
        }catch (err){
            return res.status(500).send(err.message);
        }
        
        
    });

// find all products which are higher than Rs.500

    router.get("/greater",async(req,res)=>{
  
        try{
        
            const product=await Product.find({price: {$gt:500}}).lean().exec();
            return res.status(201).send(product);
        }catch (err){
            return res.status(500).send(err.message);
        }
        
        
     });
    
  // find all the products which are available in more than 3 different colours

  router.get("/men_women",async(req,res)=>{


    try{
    
        const product=await Product.find({usage: {$eq:"men_women"}}).lean().exec();
        return res.status(201).send(product);
    }catch (err){
        return res.status(500).send(err.message);
    }
    
    
 });
 

 router.get("/colours",async(req,res)=>{


    try{
       
        const product=await Product.find(   { "colours.3" : { $exists : true }} ).lean().exec();
        return res.status(201).send(product);
    }catch (err){
        return res.status(500).send(err.message);
    }
    
 });

// 
 router.get("/coloursmatch",async(req,res)=>{
// console.log(req.query.colours_length);
  const col=req.query.colour;
        try{
        
            const product=await Product.find({colours:col}).lean().exec();
            return res.status(201).send(product);
        }catch (err){
            return res.status(500).send(err.message);
        }
        
        
     });
    
  
    



module.exports=router