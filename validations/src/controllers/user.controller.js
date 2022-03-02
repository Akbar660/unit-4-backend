
const express=require("express");

const User=require("../models/user.model");
const { body, validationResult } = require('express-validator');

const {formatErrors} = require("../utils/validation");

const router=express.Router()

router.get("", async(req, res)=>{

    try{
        const user=await User.find().lean().exec();
        return res.send(user)
    }catch (err){
       return res.status(500).json({error:err.message})
    }
})

router.post("",
   body("first_name").notEmpty().withMessage("firstname is required"),

   body("last_name").notEmpty().withMessage("lastname is required"),

   body("email").matches (/.+\@.+\..+/).withMessage("email is required and it should be a valid email contain @,."),

   body("pincode").isLength({ min: 6, max:6}).withMessage("pincode is is required with length 6"),

   body("age").isFloat({ min: 1, max: 100 }).withMessage("age must be min 1 and max 100"),

   body("gender").notEmpty().withMessage("gender required and should be either Male, Female or Others"),
   async(req, res)=>{

    try{

    const errors = validationResult(req);

       if (!errors.isEmpty()) {
      
       return res.status(400).json({ errors:formatErrors(errors.array())});
        }

       const user=await User.create(req.body);
       return res.status(201).send(user);

      }catch (err){
       return res.status(500).json({error:err.message})
    }
});


module.exports=router