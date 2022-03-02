require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};

module.exports = async (req, res, next) => {
  // check if authentication token is inside the request headers
  // if not then throw an error 400 Bad Request
  if (!req?.headers?.authorization)
    return res
      .status(400)
      .send({ message: "Please provide a valid authorization token" });

  // if yes then check that its a Bearer Token
  const bearerToken = req.headers.authorization;

  // if not a bearer token then throw an error 400 Bad Request
  if (!bearerToken.startsWith("Bearer "))
    return res
      .status(400)
      .send({ message: "Please provide a valid authorization token" });

  // if yes then verify the token and get the user from the token
  const token = bearerToken.split(" ")[1];
  let user;
  try {
    user = await verifyToken(token);
  } catch (err) {
    return res.status(401).send({ message: "The token is not valid" });
  }
  // attach the user to the request
  req.user = user.user;
console.log("user",req.user)
  // return next
  next();
};
