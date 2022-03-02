
const nodemailer=require("nodemailer");


module.exports=nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "a4ffcf0bbcf201",
      pass: "8a005e72b27dbb",
    },
  });

//   module.exports=nodemailer