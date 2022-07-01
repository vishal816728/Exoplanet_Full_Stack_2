const express=require('express')
const app=express()
const path=require('path')
const cors=require('cors')
const morgan=require('morgan')

const planetRouter=require('./routes/planets/planets.router')
const launchesRouter=require('./routes/launches/launches.router')

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(planetRouter)
app.use(launchesRouter.launchesRouter)

app.use(express.static(path.join(__dirname,"public")))
app.use(express.static("public"))
app.use(morgan('combined'))

app.get('/*',(req,res)=>{
    console.log(req.url)
    console.log(req.method)
    // res.sendFile(path.join(__dirname,"public","index.html"))
    res.sendFile(path.join(__dirname,"..","public","/index.html"))
})

if( process.env.NODE_ENV == "production"){

    app.use(express.static("client/build"));

    const path = require("path");

    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})
}

module.exports=app;



// we can also write the the line number 15 as 
// app.use('/launches',launchesRouter.launchesRouter)
// then you dont need to specify the launches in controller
// controller function be like launchROuter.get('/',function)