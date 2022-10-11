const express = require('express');
const api = express.Router();
const planetsRouter = require("./planets/planets.router");
const lauchesRouter = require("./launches/launches.router");
api.use("/planets", planetsRouter);
api.use("/launches", lauchesRouter);

module.exports=api;