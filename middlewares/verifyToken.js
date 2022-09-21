const jwt = require("jsonwebtoken");
require("dotenv").config()

const verifyToken = (req, res, next) => {
  console.log(req.headers)
  //get the tokrn from headers property of req object
  let token = req.headers.authorization;

  //if no token found
  if (token === undefined) {
    res.send({ message: "Unauthorized request" });
  }
  try {
    //verify token
    jwt.verify(token,process.env.SECRET_KEY);
    //forward req to next middleware
    next();
  } catch (err) {
    //pass error to error handling middleware
    next(err);
  }
};

module.exports = verifyToken;
