const launchesDataBase=require('./launches.mongo')
const launches=new Map()

let Default_flight_number=100;
let latestFlightNumber=100

let launch={
    flightNumber:100,
    mission:"kepler Exploration X",
    rocket:"Explorer IS1",
    launchDate:new Date('December 27,2030'),
    target:"kepler 62-f",
    customer:["spaceX","Nasa","NOAA"],
    upcoming:true,
    success:true

}


// launches.set(launch.flightNumber,launch)

async function getAllLaunches(){
   return await launchesDataBase.find({})
}

async function saveLaunch(launch){
    await launchesDataBase.updateOne({
          flightNumber:launch.flightNumber
    },launch,{
        upsert:true
    })
}

saveLaunch(launch)

async function getTheLatestFlightNumber(){
    const latestlaunch=await launchesDataBase.findOne().sort('-flightNumber')
    if(!latestlaunch){
        return Default_flight_number
    }
        return latestlaunch.flightNumber
   
    
 }

// in object we are assigning only those keys which we dont take as input from user
async function addNewLaunch(launch){
    // latestFlightNumber++
    // launches.set(latestFlightNumber,Object.assign(launch,{
    //      flightNumber:latestFlightNumber,
    //      customer:["spaceX","Nasa","Noaa"],
    //      upcoming:true,
    //      success:true,

    // }))

    const getthelatestflightnumber=await getTheLatestFlightNumber()+1
    const newLaunch=Object.assign(launch,{
             flightNumber:getthelatestflightnumber,
             customer:["spaceX","Nasa","Noaa"],
             upcoming:true,
             success:true,
    })
   await  saveLaunch(newLaunch)
}

async function ExistLaunchWIthId(id){
           return await launchesDataBase.findOne({
              flightNumber:id
          })
}



async function abortlaunchById(id){
    return await launchesDataBase.updateOne({
        flightNumber:id
    },{
        upcoming:false,
        success:false
    })
    // launches.delete(id)
    // const aborted=launches.get(id)
    // aborted.upcoming=false
    // aborted.success=false
    // return aborted
}



//we can get the launches by get 
// launches.get(flightNumber)
module.exports={
    launches,
    addNewLaunch,
    ExistLaunchWIthId,
    abortlaunchById,
    launchesDataBase,
    getAllLaunches
}

