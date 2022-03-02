const express=require("express");


const Evolution=require("../models/evolution.model")

const router=express.Router()

router.get("", async(req, res)=>{

    try{
        const evolution=await Evolution.find().lean().exec();
        return res.send(evolution)
    }catch (err){
       return res.status(500).json({error:err.message})
    }
});
router.post("", async(req, res)=>{

    try{
        const evolution=await Evolution.create(req.body);
        return res.status(201).send(evolution);
    }catch (err){
       return res.status(500).json({error:err.message})
    }
});


router.patch("/:id", async ( req,res)=>{

    try{
       const evolution=await Evolution.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
       return res.status(201).send(evolution)
    }catch (err){

      return res.status(500).send(err.message);
    }
 });

 module.exports=router
