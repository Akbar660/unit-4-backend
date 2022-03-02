
const express=require("express");

const User=require("../models/user.model");

const {uploadSingle} = require("../middleware/upload");
// ..............................

const fs = require("fs");
const {promisify} = require("util");

const unlinkAsync = promisify(fs.unlink);

// .................

const router=express.Router();

router.get("",async(req, res)=>{

    try{
        const user=await User.find().lean().exec();
        return res.send(user)
    }catch (err){
       return res.status(500).json({error:err.message})
    }
})

router.post("/single",uploadSingle("profile_pic"),async(req, res)=>{
        console.log(req.body)
    try{
       const user=await User.create({

        first_name:req.body.first_name,
        last_name:req.body.last_name,
        profile_pic:req.file.path,

       });
       
       return res.status(201).send(user);

      }catch (err){
       return res.status(500).json({error:err.message});
    }
});

router.delete("/delete/:id", async (req, res) => {

  try{
    const user=await User.findById(req.params.id).lean().exec();
    // console.log(user);
       const path =user.profile_pic;
        
        fs.unlink(path, async(err) => {
          if (err) { 
            console.error(err)
           
          }else{
              const user=await User.findByIdAndDelete(req.params.id).lean().exec();
              return res.status(201).send("deleated");
          }
        })
  }catch (err){
    return res.status(500).json({error:err.message})
  }

   
  });
  
router.patch("/update/:id",uploadSingle("profile_pic"),async (req, res) => {
console.log(req.body)
    try{
        const user=await User.findById(req.params.id).lean().exec();
        const path =user.profile_pic;
        fs.unlink(path, async(err) => {
            if (err) { 
              console.error(err)
             
            }
            else{
                const user=await User.findByIdAndUpdate(req.params.id,{profile_pic:req.file.path},{new:true}).lean().exec();
                return res.status(201).send(user);
            }
          });

     
       
     }catch (err){
 
       return res.status(500).send(err.message);
     }
    
    
       
      });



module.exports=router