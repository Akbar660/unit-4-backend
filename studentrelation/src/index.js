const express=require("express");
const mongoose=require("mongoose");




const userController=require("./controllers/user.controller")
const evolutionController=require("./controllers/evolution.controller")
const studentController=require("./controllers/student.controller")

const app = express();
app.use(express.json());


app.use("/users",userController)
app.use("/evolutions",evolutionController)
app.use("/students",studentController)


module.exports=app
