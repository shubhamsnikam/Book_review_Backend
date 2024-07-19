const mongoose = require('mongoose')

async function connectDB(){
try{
await mongoose.connect("mongodb://localhost:27017/book");
console.log("Connection Succesfull...");
}catch(error){
console.log("error in connection", error);
}
}
module.exports= {connectDB};