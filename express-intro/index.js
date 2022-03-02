
const express=require("express");
const mongoose=require("mongoose");


const connect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/library")
}

// Authour Schema and Modal

const authourSchema = new mongoose.Schema(
{
    first_name:{ type: String, required: true},
    last_name:{type: String, required: true}
},
{
    versionKey:false,
    timestamp:true,
}
);

const Authour=mongoose.model("authour", authourSchema);

// books Schema

const bookSchema=new mongoose.Schema(
    {
        bookname:{type: String, required:true},
        body:{type: String, required:true},
        checked:{type:Boolean,required:false,default:false},
        section_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "section",
            required: true,
          },
        authour_id:[
            {type:mongoose.Schema.Types.ObjectId,
            ref: "authour",
            required:true,},
        ],
     
            
         
    },
    {

        versionKey:false,
        timestamp:true,
        
    }
   
);

const Book=mongoose.model("book",bookSchema);

// Section Scheema

const sectionSchema= new mongoose.Schema(
    {
        sectionname:{type: String, required:true},
    },
    {

        versionKey:false,
        timestamp:true,
        
    }
);

const Section=mongoose.model("section",sectionSchema);


const app = express();

app.use(express.json());
// --------------Authours CRUD-------------

app.get("/authours", async(req, res)=>{

 try {
    const authour=await Authour.find().lean().exec();
    return res.send(authour);
  }catch (err){
      return res.status(500).json({error:err.messsage})
  }

})


app.post("/authours", async(req, res) => {
    try {
      const authour = await Authour.create(req.body);
  
      return res.status(201).send(authour);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  app.get("/authours/:id", async(req, res)=>{

    try{

          const authour = await Authour.findById(req.params.id).lean().exec();
          return res.status(200).send(authour)
    }catch (err){

      return res.status(500).send(err.message);
    }
   
   });


   app.patch("/authours/:id", async ( req,res)=>{

      try{
         const authour=await Authour.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
         return res.status(201).send(authour)
      }catch (err){

        return res.status(500).send(err.message);
      }
   });

   app.delete("/authours/:id", async ( req,res)=>{

    try{
       const authour=await Authour.findByIdAndDelete(req.params.id).lean().exec();
       return res.status(200).send(authour)
    }catch (err){

      return res.status(500).send(err.message);
    }
 });


//  section schema .................

app.post("/sections",async(req, res)=>{

  try{
    const section=await Section.create(req.body);
    return res.status(200).send(section)
  }catch (err){
    return res.status(500).send(err.message)
  }

});

app.get("/sections", async(req, res)=>{

  try {
     const section=await Section.find().lean().exec();
     return res.status(200).send(section);
   }catch (err){
       return res.status(500).json({error:err.messsage})
   }
 
 });

 app.get("/sections/:id", async(req, res)=>{

  try {
     const section=await Section.findById(req.params.id).lean().exec()
     return res.status(200).send(section);
   }catch (err){
       return res.status(500).send(err.message)
   }
 
 });

 app.patch("/sections/:id", async(req, res)=>{

  try {
     const section=await Section.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
     return res.status(200).send(section);
   }catch (err){
       return res.status(500).send(err.message)
   }
 
 });


 app.delete("/sections/:id", async(req, res)=>{

  try {
     const section=await Section.findByIdAndDelete(req.params.id).lean().exec()
     return res.status(200).send(section);
   }catch (err){
       return res.status(500).send(err.message)
   }
 
 });

// book schema

app.post("/books",async(req, res)=>{

  try{
    const book=await Book.create(req.body);
    return res.status(200).send(book)
  }catch (err){
    return res.status(500).send(err.message)
  }

});

app.get("/books", async(req, res)=>{

  try {
     const book=await Book.find()
     .populate("authour_id")
     .populate("section_id")
     .lean()
     .exec();

     return res.status(200).send(book);
   }catch (err){
       return res.status(500).json({error:err.messsage})
   }
 
 });

//  find all books written by an author..............

app.get("/books/authour/:id", async(req, res)=>{

  try {
     const book=await Book.find({authour_id:req.params.id})
     .populate("authour_id")
     .populate("section_id")
     .lean()
     .exec();


     return res.status(200).send(book);
   }catch (err){
       return res.status(500).send(err.message)
   }
 
 });

//  find books in a section.......................

 app.get("/books/section/:id", async(req, res)=>{

  try {
     const book=await Book.find({section_id:req.params.id})
     .populate("authour_id")
     .populate("section_id")
     .lean()
     .exec();


     return res.status(200).send(book);
   }catch (err){
       return res.status(500).send(err.message)
   }
 
 });

// find books of 1 author inside a section..............................
 
 app.get("/books/section/:id1/authour/:id2", async(req, res)=>{
   console.log(req.params.id)

  try {
     const book=await Book.find({$and:[{section_id:{$eq:req.params.id1}},{authour_id:{$eq:req.params.id2}}]})
     .populate("authour_id")
     .populate("section_id")
     .lean()
     .exec();


     return res.status(200).send(book);
   }catch (err){
       return res.status(500).send(err.message)
   }
 
 });

//  find books that are checked out..............................

 app.get("/books/checked", async(req, res)=>{

  try {
     const book=await Book.find({checked :{$eq:true}})
     .populate("authour_id")
     .populate("section_id")
     .lean()
     .exec();


     return res.status(200).send(book);
   }catch (err){
       return res.status(500).send(err.message)
   }
 
 });

//  find books in a section that are not checked out..........................

 app.get("/books/section/:id/checked", async(req, res)=>{

  try {
     const book=await Book.find({$and: [{section_id:{$eq:req.params.id}},{checked :{$ne:true}}]})
     .populate("authour_id")
     .populate("section_id")
     .lean()
     .exec();


     return res.status(200).send(book);
   }catch (err){
       return res.status(500).send(err.message)
   }
 
 });

 app.patch("/books/checked/:id", async(req, res)=>{

  try {
     const book=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
     .populate("authour_id")
     .populate("section_id")
     .lean()
     .exec();


     return res.status(200).send(book);
   }catch (err){
       return res.status(500).send(err.message)
   }
 
 });


 app.delete("/books/:id", async(req, res)=>{

  try {
     const book=await Book.findByIdAndDelete(req.params.id).lean().exec()
     return res.status(200).send(book);
   }catch (err){
       return res.status(500).send(err.message)
   }
 
 });





app.listen(2345, async () => {
    try {
      await connect();
      console.log("listening on port 2345");
    } catch (e) {
      console.log(e.message);
    }
  });


