const express = require('express');
const messageController = require('../controllers/message.controller');

const messagesRouter = express.Router();
messagesRouter.get('/',messageController);

module.exports = messagesRouter;