const app=require('./app.js')
const http=require('http')
const cluster=require('cluster')
const os=require('os')
const mongoose=require('mongoose')
const {loadStreamData}=require("./model/planets.model")

const port=process.env.PORT || 8000

// now all the middlewares passing through will be applied on the each request
const server=http.createServer(app)

const Mongo_URL='mongodb+srv://Vishal_kumar:vishal@cluster0.x4fyx.mongodb.net/?retryWrites=true&w=majority'
//mongoose connection is a event emitter which emits the event when connection is establish to the database
// you can use on here as well but once make sure this is triggered only once
mongoose.connection.once('open',()=>{
    console.log("connection is establish")
})
mongoose.connection.on('error',(err)=>{
    console.log(`mongoose connection is lost ${err}`)
})

async function startServer(){
    await mongoose.connect(Mongo_URL,{
        // how mongoose parses the connection strings
        useNewUrlParser:true,
        // use the updated way of talking to the cluster
        useUnifiedTopology:true
    })
    await loadStreamData()
    //node uses cluster to load balance to multiple node process
    if(cluster.isMaster){
       const NUM_OS=os.cpus().length
       for(let i=0;i<NUM_OS;i++){
           cluster.fork()           
       }
    }else{
          
        server.listen(port,()=>{
            console.log(`server is listening  ${port}`)
        })
    }
}

startServer()



// Note i am applying cluster using built method but in production use pm2












