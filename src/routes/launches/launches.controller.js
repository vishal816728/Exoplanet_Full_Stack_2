const launches=require('../../model/launch.model')

const {ExistLaunchWIthId,abortlaunchById}=require('../../model/launch.model')
async function httpGetAllLaunches(req,res){
        //  return res.status(200).json(Array.from(launches.launches.values()))
      return res.status(200).json(await launches.getAllLaunches())
}

async function httpAddNewLaunch(req,res){
    const launch=req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        res.status(400).json({"error":"all the parameters donot match"})
    }
    launch.launchDate=new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){
        res.status(400).json({
            "error":"Wrong Date"
        })
    }
   await launches.addNewLaunch(launch)
   return res.status(201).json(launch)
}

async function httpAbortLaunch(req,res){
      let id=Number(req.params.id);
    //   if(ExistLaunchWIthId(id)){
    //        res.status(200).json(abortlaunchById(id))
    //   }else{
    //       res.status(404).json({
    //           "error":"Id does not Exist"
    //       })
    //   }  
    const existlaunch=await ExistLaunchWIthId(id)
    if(!existlaunch){
        res.status(404).json({
                      "error":"Id does not Exist"
                  })
    }

    const aborted=abortlaunchById(id)
    return res.send(200).json(aborted)

}
module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}