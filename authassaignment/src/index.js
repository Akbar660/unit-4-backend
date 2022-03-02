const express = require("express");

var bodyParser = require('body-parser')

const registerController= require("./controllers/auth.controller");
// const req = require("express/lib/request");
// const res = require("express/lib/response");


// const { body, validationResult } = require('express-validator');

// const {formatErrors} = require("./utils/validation");


const app = express();
app.use(express.json());


app.use(express.static("public"));
app.use("/css",express.static(__dirname + "public/css"));
app.use("/js",express.static(__dirname + "public/js"));




app.set("views","./src/views");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
// register => /users/register  /register

app.get("/home_page",(req,res)=>{
   res.render("home"); 
})



app.use("/home",registerController);





module.exports = app;


