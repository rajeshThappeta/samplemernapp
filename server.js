//create express application
const exp = require("express");
const app = exp();

const path=require("path")
require("dotenv").config()

//connect react build with http server
app.use(exp.static(path.join(__dirname,'./build/')))

//import MongoClient
const mclient=require("mongodb").MongoClient;

//get db url
const dburl=process.env.DB_URL;

//connect to Database
mclient.connect(dburl)
.then(client=>{
  //get Database obj
  let dbObj=client.db("appdata")
  //get colelction object
  let usercollectionObj=dbObj.collection("usercollection")
  let productcollectionOb=dbObj.collection("productcollection")
  //share to userApi & productApi
  app.set("usercollectionObj",usercollectionObj)
  app.set("productcollectionOb",productcollectionOb)

  console.log("Database connection success")

})
.catch(err=>console.log("err in database connect ",err))

//add body parser
app.use(exp.json());

//import apis
const userApp=require("./APIs/userApi");
const productApp=require('./APIs/productApi')

//execute specific API based on req
app.use("/user",userApp);
app.use("/product",productApp)


//dealing with invalid path
app.use("**",(req,res,next)=>{
  res.send({message:"Invalid path"})
})


//error handler
app.use((err,req,res,next)=>{
  res.send({message:err.message})
})

//allign port number
const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));
