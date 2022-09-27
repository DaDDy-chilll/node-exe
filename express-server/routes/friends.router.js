const express = require('express');
const friendController = require('../controllers/friends.controller');

const freindsRouter = express.Router();
freindsRouter.get('/',friendController.getFriends);
freindsRouter.post('/',friendController.postFriends);
freindsRouter.get('/:friendId',friendController.getFriend);

module.exports=freindsRouter;