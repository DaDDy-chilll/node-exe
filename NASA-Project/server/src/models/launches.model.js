const axios = require("axois");
const launchesData = require("./launches.mongo");
const planets = require("./planets.mongo");
const DEFAULT_FLIGHTNUMBER = 100;
// const launches = new Map();
// let latestFlightNumber = 100;
const launch = {
  flightNumber: 100, //exist
  mission: "Exoplanets IS1", //exit
  rocket: "USA1", //exit
  target: "Kepler-442 b", //planets
  launchDate: new Date("January 7,2030"), //exist
  customer: ["DaDDy", "NASA"], //exist
  upcoming: true, //exist
  success: true, // exist
};

saveLaunch(launch);

const SPACEX_URL = "https://api.spacexdata.com/v5/launches/latest";
function loadLaunchData() {
  console.log("Data is loading....");
  const response = axios.post(SPACEX_URL, {
    query: {},
    options: {
      pagination: false,
      populate: {},
    },
  });
}

async function getAllLaunches() {
  return await launchesData.find({}, { _id: 0, __v: 0 });
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
};
