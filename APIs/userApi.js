//create express route(mini express userApp)
const exp = require("express");
const userApp = exp.Router();
require("dotenv").config()

//import express-async-handler
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken=require("../middlewares/verifyToken")


//Routes for GET req
userApp.get(
  "/getusers",
  expressAsyncHandler(async (req, res) => {

    console.log(req.headers)
    //get usercollectionObj
    let usercollectionObj = req.app.get("usercollectionObj");

    //get all users
    let usersArray = await usercollectionObj.find().toArray();
    res.send({ message: "All users", payload: usersArray });
  })
);

//Route for get user by ID
userApp.get(
  "/getuser/:id",
  expressAsyncHandler(async (req, res) => {
    //get usercollectionObj
    let usercollectionObj = req.app.get("usercollectionObj");
    //get userId from url param
    let userId = +req.params.id;

    //get user by id
    let userObj = await usercollectionObj.findOne({ id: { $eq: userId } });
    res.send({ message: "User", payload: userObj });
  })
);

//Route for create user
userApp.post(
  "/create-user",
  expressAsyncHandler(async (req, res) => {
    //get usercollectionObj
    let usercollectionObj = req.app.get("usercollectionObj");
    //get userObj from req
    let userObj = req.body;

    //verify duplicate user
    let result = await usercollectionObj.findOne({
      username: userObj.username,
    });

    //if username existed, send response as duplicate user
    if (result !== null) {
      res.send({
        message: "User has already existed..Plz choose another username",
      });
    } else {
      //if username not existed, hash the password
      let hashedPassword = await bcryptjs.hash(userObj.password, 6);
      //replace plain password with hashed password
      userObj.password = hashedPassword;
      //insert user obj
      await usercollectionObj.insertOne(userObj);
      //send res
      res.send({ message: "User created" });
    }
  })
);


//Route for user login
userApp.post("/login",expressAsyncHandler(async(req,res)=>{
     //get usercollectionObj
     let usercollectionObj = req.app.get("usercollectionObj");
     //get userObj from req
     let userCredentialsObj = req.body;
     //verify username
     let user=await usercollectionObj.findOne({username:userCredentialsObj.username})
     //if username not found
     if(user===null){
      res.send({message:"Invalid Username"})
     }
     //if username matched
     else{
      //compare passwords
      let result=await bcryptjs.compare(userCredentialsObj.password,user.password)
      //if passwords are not matched
      if(result===false){
        res.send({message:"Invalid Password"})
      }
      //if passwords are matched
      else{
        //create JWT token
        let token= jwt.sign({username:user.username},process.env.SECRET_KEY,{expiresIn:100})
        //send response
        res.send({message:"success",token:token,user:user})
      }
     }
}))






//private routes
userApp.get("/private",verifyToken,expressAsyncHandler((req,res)=>{


 // console.log(req.headers)
  res.send({message:"This message is from private route"})
}))


userApp.post("/private",verifyToken,expressAsyncHandler((req,res)=>{


  // console.log(req.headers)
   res.send({message:"This message is from private route"})
 }))

















//Route for Update user
userApp.put(
  "/update-user/:id",
  expressAsyncHandler(async (req, res) => {
    //get usercollectionObj
    let usercollectionObj = req.app.get("usercollectionObj");
    //get userId from url
    let userId = +req.params.id;
    //get body from req
    let modifiedUser = req.body;

    //update user
    await usercollectionObj.updateOne(
      { id: { $eq: userId } },
      { $set: { ...modifiedUser } }
    );
    res.send({ message: "User modified" });
  })
);

//Route for deleteing user
userApp.delete("/delete-user/:id", (req, res) => {
  //get userId from url
  let userId = +req.params.id;
});

//export
module.exports = userApp;
