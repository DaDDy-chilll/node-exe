const {getAllLaunches,addNewLaunches,existLaunchId,abortLaunches} = require('../../models/launches.model');
const {getPagination} = require('../../services/query')

async function httpGetAllLaunches(req,res){
    const {skip,limit} = getPagination(req.query);
    const launches = await getAllLaunches(skip,limit);
    res.status(200).json(launches);
}

async function httpAddNewLaunches(req,res){
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
    await addNewLaunches(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunches(req,res){
    const launchId = Number(req.params.id);
    const existLaunch = await existLaunchId(launchId);
    if(!existLaunch){
        return res.status(400).json({
            error:'Launch not found!',
        })
    }

         const abort = await abortLaunches(launchId);
    if(!abort){
        return res.status(400).json({
            error:'Launch not abored!'
        })
    }
    return res.status(200).json({ok:true})
}
module.exports={
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAbortLaunches,
}