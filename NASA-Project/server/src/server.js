const http = require('http');
const app = require('./app');
const {connectMongo} = require('./services/mongo');
const {loadLaunchData} = require('./models/launches.model');
const {loadData} = require('./models/planets.model');


const PORT = process.env.PORT || 8000;
const server = http.createServer(app);


async function startServer(){
    await connectMongo();
    await loadData();
    await loadLaunchData();
   server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
    })
}
startServer();