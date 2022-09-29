// Load planets and return as JSON.
// TODO: Once API is ready.
const API_URL = 'http://localhost:8000'
async function httpGetPlanets() {
 const respone = await fetch(`${API_URL}/planets`);
  return await respone.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };