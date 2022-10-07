const {parse} = require('csv-parse');
const path = require('path');
const fs = require('fs');
const planets = require('./planets.mongo');
const habitablePlanets = [];
function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
function loadData(){
    new Promise((resolve,reject)=>{
    fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
.pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
.on('data',async (data)=>{
  if(isHabitablePlanet(data)){
    await savePlanets(data)
  }
})
.on('error',(err)=>{
    console.log(err);
    reject(err);

})
.on('end',()=>{
    // console.log(habitablePlanets.map((planet)=>{
    //   return planet['kepler_name']
    // }));
    console.log('Done!');
    resolve();
});
})

}

async function savePlanets(planet){
  try{
     await planets.updateOne({
    keplerName:planet.kepler_name,
  },{
    keplerName:planet.kepler_name,
  },{
    upsert:true,
  })
  }catch(err){
    console.log(`Could not save planets ${err}`)
  }
 
}

async function getAllPlanets(){
    return await planets.find({});
}
module.exports={
    getAllPlanets,
    loadData,
};