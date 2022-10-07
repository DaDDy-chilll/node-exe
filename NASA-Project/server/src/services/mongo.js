const async = require('hbs/lib/async');
const mongoose = require('mongoose');

const MOGO_URL = 'mongodb+srv://nasa-api:nasaapi123@nasacluster.uvu3kll.mongodb.net/nasaexe?retryWrites=true&w=majority';
mongoose.connection.once('open',()=>{
    console.log('Mongo is already connected')
})

mongoose.connection.on('error',(err)=>{
    console.error(err);
});

async function connectMongo(){
    await mongoose.connect(MOGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

async function disconnectMongo(){
    await mongoose.disconnect();
}

module.exports = {
    connectMongo,
    disconnectMongo,
}