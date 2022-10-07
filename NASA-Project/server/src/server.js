const http = require('http');
const os = require('os');
const cluster = require('cluster');
const app = require('./app');
const {connectMongo} = require('./services/mongo')
const {loadData} = require('./models/planets.model');


const PORT = process.env.PORT || 8000;
const server = http.createServer(app);


async function startServer(){
    await connectMongo();
    await loadData();
     if(cluster.isMaster){
        const NUM_WORKER = os.cpus().length;
       for(let i=0;i>NUM_WORKER;i++){
        await cluster.fork();
       }
        console.log('Master is running....')
    }else{
        console.log('Worker is running ....')
    await server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
    })
}
}

startServer();