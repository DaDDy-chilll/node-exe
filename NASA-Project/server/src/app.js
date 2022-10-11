const express = require("express");
const morgan = require("morgan");
const path= require('path');
const api = require('./routes/api');
const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname,'..','public')));
app.use('/v1',api);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})
module.exports = app;
