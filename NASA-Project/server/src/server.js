const async = require('hbs/lib/async');
const http = require('http');
const { required } = require('nodemon/lib/config');
const app = require('./app');
const {loadData} = require('./models/planets.model')
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);


async function startServer(){
    await loadData();
    server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
}

startServer();