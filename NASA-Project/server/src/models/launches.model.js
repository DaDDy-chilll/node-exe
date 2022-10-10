const launchesData = require('./launches.mongo');
const planets = require('./planets.mongo');
const DEFAULT_FLIGHTNUMBER = 100;
// const launches = new Map();
// let latestFlightNumber = 100;
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

async function getlatesFlightNumber(){
    const latestNo = await launchesData.findOne().sort('-flightNumber');

    if(!latestNo){
        return DEFAULT_FLIGHTNUMBER;
    }
    return latestNo.flightNumber;
}


async function addNewLaunches(launch){
    const latestFlightNumber = await  getlatesFlightNumber() +1
    const newLaunch = Object.assign(launch,{
        upcoming:true,
        success:true,
        flightNumber:latestFlightNumber,
    });
    await saveLaunch(newLaunch);
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