
async function httpGetPlanets() {
 
  const response=await fetch('http://localhost:8000/planets')
        return await response.json()     

  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const launch=await fetch('http://localhost:8000/launches')
  const fetchedLaunches=await launch.json()
  return fetchedLaunches.sort((a,b)=>{
    return a.flightNumber-b.flightNumber
   })
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try{
 const dataposted=await fetch('http://localhost:8000/launches',{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(launch),

  })
  console.log(dataposted)
  return dataposted

}catch(err){
  console.log(err)
  return {
    ok:false,
  }
}
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try{
       return await fetch(`http://localhost:8000/launches/${id}`,{
         method:"delete",
       })
  }catch(err){
           console.log(err)
           return {
             ok:false
           }
  }
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};