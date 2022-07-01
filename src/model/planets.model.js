const fs=require('fs')
const path=require('path')
const {parse}=require('csv-parse')


function isHabitablePlanet(data){
    return data['koi_disposition']==="CONFIRMED" 
    && data['koi_insol']>0.36 && data['koi_insol']<1.11
    && data['koi_prad']<1.6
}
const HabitablePlanet=require('./planets.mongo')
const planets=[]
function loadStreamData(){
    return new Promise((resolve,reject)=>{
    fs.createReadStream(path.join(__dirname,'..','..','Data','cumulative_2022.06.23_12.34.32.csv'))

    .pipe(parse({
        comment:'#',
        columns:true,
    }))
    .on('data',async (result)=>{
        if(isHabitablePlanet(result)){
               planets.push(result)
               try{
               await HabitablePlanet.updateOne({
                   kepler_name:result.kepler_name
               },{
                   kepler_name:result.kepler_name
               },{
                   upsert:true
               })
            }catch(err){
                console.log(`some error occurs while updating the value ${err}`)
            }
               //second parameter is there to check if data is there then update the value
               // upsert means insert +update
        }
    })
    .on('error',(err)=>{
        console.log(err)
        reject(err)
    })
    .on('end',()=>{
        planets.map(planet=>{
            console.log(planet.kepoi_name)
        })
        console.log("It is done")
        resolve()
    })
    

})
}

module.exports={
    planets,
    loadStreamData,
    HabitablePlanet
}