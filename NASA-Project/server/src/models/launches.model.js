const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber:100,
    mission:'Exoplanets IS1',
    rocket:'USA1',
    target:'Kepler-66 f',
    launchDate:new Date('January 7,2030'),
    customer:['DaDDy','NASA'],
    upcoming:true,
    success:true,
};
launches.set(launch.flightNumber,launch);

function getAllLaunches(){
    return Array.from(launches);
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

module.exports = {
    getAllLaunches,
    addNewLaunches
}