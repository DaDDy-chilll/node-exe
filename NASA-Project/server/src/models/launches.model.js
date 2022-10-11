const axios = require("axios");
const launchesData = require("./launches.mongo");
const planets = require("./planets.mongo");
const DEFAULT_FLIGHTNUMBER = 100;
// const launches = new Map();
// let latestFlightNumber = 100;
// const launch = {
//   flightNumber: 100, //exist flight_number
//   mission: "Exoplanets IS1", //exit name
//   rocket: "USA1", //exit rocket.name
//   target: "Kepler-442 b", //planets 
//   launchDate: new Date("January 7,2030"), //exist date_utc
//   customer: ["DaDDy", "NASA"], //exist payloads.customers
//   upcoming: true, //exist upcoming
//   success: true, // exist success
// };

// saveLaunch(launch);

const SPACEX_URL = "https://api.spacexdata.com/v5/launches/query";
async function populateLaunch() {
  console.log("Data is loading....");
  const response = await axios.post(SPACEX_URL,{
    query:{},
    options:{
            pagination:false,
            populate:[
                {
                    path:"rocket",
                    select:{
                      name:1,
                    }
                },
                {
                    path:"payloads",
                    select:{
                      customers:1,
                    }
                }
            ]
        }
  });
  if(response.status !== 200){
    console.log('Some problems downloaded launch data')
     throw new Error('Launch data downloaded fail')
  }
  const launchDocs = response.data.docs;
  for(let launchDoc of launchDocs){
    const payloads = launchDoc['payloads'];
    const customer = payloads.flatMap(payload=> payload['customers']);
      const launch = {
    flightNumber:launchDoc['flight_number'],
    mission:launchDoc['name'],
    rocket:launchDoc['rocket']['name'],
    target:'Kepler-442 b',
    launchDate:launchDoc['date_local'],
    upcoming:launchDoc['upcoming'],
    success:launchDoc['success'],
    customer,
  }
  // console.log(`${launch.flightNumber} && ${launch.mission}`);
  await saveLaunch(launch)
  }

}

async function loadLaunchData(){
  const firstLaunch = await findLaunchData({
   flightNumber:1,
    rocket:'Falcon 1',
    mission:'FalconSat'
  });
  if(firstLaunch){
    console.log('Data is already loaded')
  }else{
    await  populateLaunch()
  }
}

async function findLaunchData(filter){
  return await launchesData.findOne(filter);
}

async function getAllLaunches(skip,limit) {
  return await launchesData
  .find({}, { "_id": 0, "__v": 0 })
  .sort({flightNumber:1})
  .skip(skip)
  .limit(limit);
}

async function getlatesFlightNumber() {
  const latestNo = await launchesData.findOne().sort("-flightNumber");

  if (!latestNo) {
    return DEFAULT_FLIGHTNUMBER;
  }
  return latestNo.flightNumber;
}

async function addNewLaunches(launch) {
  const latestFlightNumber = (await getlatesFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    flightNumber: latestFlightNumber,
    customer: ["DaDDy", "USA"],
  });
  await saveLaunch(newLaunch);
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet found!");
  }
  await launchesData.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function existLaunchId(launchId) {
  return await launchesData.findOne({
    flightNumber: launchId,
  });
}

async function abortLaunches(launchId) {
  const abored = await launchesData.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return abored.matchedCount === 1 && abored.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
  existLaunchId,
  abortLaunches,
  loadLaunchData,
};
