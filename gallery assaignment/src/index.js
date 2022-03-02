const express=require("express");




const userController=require("./controllers/user.controller")
const galleryController=require("./controllers/gallery.controller")

const app = express();
app.use(express.json());


app.use("/users",userController)
app.use("/galleryes",galleryController)



module.exports=app