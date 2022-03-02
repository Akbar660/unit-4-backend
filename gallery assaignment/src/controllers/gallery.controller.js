
const express=require("express");

const Gallery=require("../models/gallery.model");

const {uploadMultiple} = require("../middleware/upload");

const fs = require("fs");
const {promisify} = require("util");

const unlinkAsync = promisify(fs.unlink);

const router=express.Router();

router.get("",async(req, res)=>{

    try{
        const gallery=await Gallery.find()
        .populate().lean().exec();
        return res.send(gallery)
    }catch (err){
       return res.status(500).json({error:err.message})
    }
});



router.post("/multiple", uploadMultiple(2,"gallery_pics"),async(req, res)=>{

    console.log("files",req.files)
    try{
      
        const filePaths=req.files.map((file)=>file.path)

       const gallery=await Gallery.create({

        gallery_pics:filePaths,
        user_id:req.body.user_id,

       });
       return res.status(201).send(gallery);

      }catch (err){
       return res.status(500).json({error:err.message});
    }
});

router.delete("/deletegallery/:id", async (req, res) => {

    try{
      const gallery=await Gallery.findById(req.params.id).lean().exec();
      console.log( gallery);
         const path =gallery.gallery_pics;
      for(var i=0;i<path.length;i++){
        fs.unlink(path[i], async(err) => {
            if (err) { 
              console.error(err)
             
            }
        })
      };
    
        return res.status(201).send("deleated");
  
       
    }catch (err){
      return res.status(500).json({error:err.message})
    }
  
     
    });



module.exports=router