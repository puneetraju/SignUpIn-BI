const mongoose  = require("mongoose");

mongoose.connect("mongodb://localhost:27017/signUpIn")
.then(()=>{
    console.log("DB connected")
})
.catch(()=>{
    console.log("DB not connected")
})

const LogInSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})

const collection = new mongoose.model("Credentials",LogInSchema)
module.exports= collection