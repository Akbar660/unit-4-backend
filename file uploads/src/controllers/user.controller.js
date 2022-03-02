
const express=require("express");

const User=require("../models/user.model");

const { uploadSingle, uploadMultiple } = require("../middleware/upload");


const router=express.Router();

router.get("",async(req, res)=>{

    try{
        const user=await User.find().lean().exec();
        return res.send(user)
    }catch (err){
       return res.status(500).json({error:err.message})
    }
})

router.post("/single",uploadSingle("img_urls"),async(req, res)=>{

    try{
       const user=await User.create({

        first_name:req.body.first_name,
        last_name:req.body.last_name,
        img_urls:req.file.path,

       });
       return res.status(201).send(user);

      }catch (err){
       return res.status(500).json({error:err.message})
    }
});


router.post("/multiple", uploadMultiple(2,"img_urls"),async(req, res)=>{

    console.log("files",req.files)
    try{
      
        const filePaths=req.files.map((file)=>file.path)

       const user=await User.create({

        first_name:req.body.first_name,
        last_name:req.body.last_name,
        img_urls:filePaths,

       });
       return res.status(201).send(user);

      }catch (err){
       return res.status(500).json({error:err.message})
    }
});


module.exports=router