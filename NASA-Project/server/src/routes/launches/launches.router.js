const { required } = require("nodemon/lib/config");

const express = require('express');
const {httpGetAllLaunches,httpAddNewLaunches,httpAbortLaunches} = require('./launches.controller');
const lauchesRouter = express.Router();

lauchesRouter.get('/',httpGetAllLaunches);
lauchesRouter.post('/',httpAddNewLaunches);
lauchesRouter.delete('/:id',httpAbortLaunches)
module.exports=lauchesRouter;