
const express=require("express");

const User=require("../models/user.model")

const router=express.Router()

router.get("", async(req, res)=>{

    try{
        const user=await User.find().lean().exec();
        return res.send(user)
    }catch (err){
       return res.status(500).json({error:err.message})
    }
})

router.post("", async(req, res)=>{

    try{
        const user=await User.create(req.body);
        return res.status(201).send(user);
    }catch (err){
       return res.status(500).json({error:err.message})
    }
});
router.patch("/:id", async ( req,res)=>{

    try{
       const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
       return res.status(201).send(user)
    }catch (err){

      return res.status(500).send(err.message);
    }
 });


module.exports=router