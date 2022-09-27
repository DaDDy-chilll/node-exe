const model = require('../models/friends.model');
function getFriends  (req,res){
    res.send(model);
}

function getFriend(req,res){
    const friendId = Number(req.params.friendId);
    const friend = model[friendId];
    if (friend) {
        res.status(200).json(friend)
    }else{
        res.json({
            error:'friend does not exist!'
        });
    }

}

function postFriends (req,res){
    if(!req.body.name){
        return res.status(400).json({
            error:'Missing friend name...'
        })
    }
        const newFriend = {
            name:req.body.name,
            id:model.length,
        };
        model.push(newFriend);
        res.json(newFriend);
    
    // console.log('hello'); above return keyword is main
}

module.exports={
    getFriend,
    getFriends,
    postFriends
}