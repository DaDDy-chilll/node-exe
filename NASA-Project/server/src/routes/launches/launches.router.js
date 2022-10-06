const { required } = require("nodemon/lib/config");

const express = require('express');
const {httpGetAllLaunches,httpAddNewLaunches} = require('./launches.controller');
const lauchesRouter = express.Router();

lauchesRouter.get('/',httpGetAllLaunches);
lauchesRouter.post('/',httpAddNewLaunches);
module.exports=lauchesRouter;