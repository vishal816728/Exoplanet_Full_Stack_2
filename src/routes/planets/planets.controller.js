const planets=require('../../model/planets.model')

// return will make sure  only set the response once 
function getAllPlanets(req,res){
    console.log(planets.planets)
    
    return res.status(200).json(planets.planets)
    // return planets.HabitablePlanet.find({})
}

module.exports={
    getAllPlanets
}