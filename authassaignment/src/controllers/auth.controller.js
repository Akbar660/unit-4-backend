require("dotenv").config();
const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 5,
  });
};

// router.get("/register",(req,res)=>{
//   res.render("regform");
// });
// router.get("/login",(req,res)=>{
//   res.render("login");
// })

router.post("/reg",async (req, res)=> {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user)
      return res
        .status(400)
        .send({ message: "User with that email already exists" });

  
    user = await User.create(req.body);
    const token = newToken(user);
    console.log(user)
    
     res.redirect("/home")
    // return res.send({user:user,token:token});

 } catch (err) {
    return res.send({ message: err.message });
  }
});

router.post("/log",async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .send({ message: "Either Email or Password is incorrect" });

    const match = user.checkPassword(req.body.password);
    if (!match)
      return res
        .status(400)
        .send({ message: "Either Email or Password is incorrect" });

    const token = newToken(user);
   
    return res.send({user:user,token:token,message:"login sucessfull"});
    
  } catch (err) {
    return res.status(500).send({ success:false,message: err.message });
  }
});

module.exports = router
