const express=require("express");

const Student=require("../models/student.model");

const router=express.Router()





router.get("", async(req, res)=>{

    try{
        const student=await Student.find()
        .populate("user_id")
        .populate("evolution_id")
        .lean()
        .exec();
        return res.send(student)
    }catch (err){
       return res.status(500).json({error:err.message})
    }
});

router.get("/evolution/:id", async(req, res)=>{

    try{
        const student=await Student.find({evolution_id:{$eq:req.params.id}})
        .populate("user_id")
        .populate("evolution_id")
        .lean()
        .exec();
        return res.send(student)
    }catch (err){
       return res.status(500).json({error:err.message})
    }
});

router.get("/evolution/:id/sort", async(req, res)=>{

    try{
        const student=await Student.find({evolution_id:{$eq:req.params.id}}).sort({marks:-1}).limit(1)
        .populate("user_id")
        .populate("evolution_id")
        .lean()
        .exec();
        return res.send(student)
    }catch (err){
       return res.status(500).json({error:err.message})
    }
});


router.post("", async(req, res)=>{

    try{
        const student=await Student.create(req.body);
        return res.status(201).send(student);
    }catch (err){
       return res.status(500).json({error:err.message})
    }
});


router.patch("/:id", async ( req,res)=>{

    try{
       const student=await Student.findByIdAndUpdate(req.params.id,req.body,{new:true})
       .populate("user_id")
        .populate("evolution_id")
        .lean()
        .exec();
       return res.status(201).send(student)
    }catch (err){

      return res.status(500).send(err.message);
    }
 });
 router.delete("/:id", async(req, res)=>{

    try {
       const student=await Student.findByIdAndDelete(req.params.id).lean().exec()
       return res.status(200).send(student);
     }catch (err){
         return res.status(500).send(err.message)
     }
   
   });
  

   module.exports=router