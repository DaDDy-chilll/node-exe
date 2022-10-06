const express = require("express");
const morgan = require("morgan");
const path= require('path');
const planetsRouter = require("./routes/planets/planets.router");
const lauchesRouter = require("./routes/launches/launches.router");
const { required } = require("nodemon/lib/config");
const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname,'..','public')));
app.use("/planets", planetsRouter);
app.use("/launches", lauchesRouter);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})
module.exports = app;