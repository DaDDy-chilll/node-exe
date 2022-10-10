const launchesData = require('./launches.mongo');
const planets = require('./planets.mongo');
// const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber:100,
    mission:'Exoplanets IS1',
    rocket:'USA1',
    target:'Kepler-442 b',
    launchDate:new Date('January 7,2030'),
    customer:['DaDDy','NASA'],
    upcoming:true,
    success:true,
};
saveLaunch(launch);

async function getAllLaunches(){
    return await launchesData.find({},{'_id':0,'__v':0});
}



function addNewLaunches(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber,Object.assign(launch,{
        upcoming:true,
        success:true,
        customer:['DaDDy-chill','TASLA'],
        flightNumber:latestFlightNumber,
    }));
}

async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName:launch.target,
    });
    if(!planet){
        throw new Error('No matching planet found!')
    }
    await launchesData.findOneAndUpdate({flightNumber:launch.flightNumber},launch,{upsert:true});
}

module.exports = {
    getAllLaunches,
    addNewLaunches
}