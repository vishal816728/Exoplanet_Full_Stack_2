
const mongoose=require('mongoose')

// kepler_name Name should be align with client code
const planetsSchema=new mongoose.Schema({
    kepler_name:{
        type:String,
        required:true
    }
})


module.exports=mongoose.model("Planet",planetsSchema)