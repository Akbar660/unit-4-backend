

const express = require("express");

const User=require("../models/user.model");

const transporter=require("../configs/email")

const router=express.Router();


router.post("",async(req, res)=>{

    try{
       
     const user=await User.create(req.body); 
   console.log(user.email)
 
     const message = {
        from: "shaikakbarbasha38@gmail.com",
        to: user.email,
        subject:`Welcome to ABC system ${user.first_name} ${user.last_name}`,
        text:`Hi ${user.first_name}, Please confirm your email address`,
        html: "<h1>successfully tested</h1>"
      };

      transporter.sendMail(message);

     return res.status(201).send(user);

    }catch (err){
        return res.status(500).json({error:err.message});
    }
});

router.get("", async(req, res)=>{

    try{
        const page=+req.query.page || 1;
         const size=+req.query.size || 5;

         const skip=(page-1)*size;

        const user=await User.find().skip(skip).limit(size).lean().exec();
       
         const totalpages=Math.ceil(await User.find().countDocuments()/size);

        return res.status(200).send({user,totalpages});
    }catch (err){
       return res.status(500).json({error:err.message})
    }
})


module.exports=router