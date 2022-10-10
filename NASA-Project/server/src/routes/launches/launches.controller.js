const {getAllLaunches,addNewLaunches} = require('../../models/launches.model');

async function httpGetAllLaunches(req,res){
    res.status(200).json(await getAllLaunches());
}

function httpAddNewLaunches(req,res){
    const launch = req.body;
    if(!launch.mission || !launch.target || !launch.rocket || !launch.launchDate){
        return res.status(400).json({
            error:'Missing Launch property...'
        });
    };
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:'Invalid launch Date...'
        });
    };
    addNewLaunches(launch);
    return res.status(201).json(launch);
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunches,
}