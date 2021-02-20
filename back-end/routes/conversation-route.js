const express = require('express');

const controller = require('../controllers/conversation-controller');

const router = express.Router();

router.post('/initiate', controller.initiateConversation);
router.post('/message', controller.sendMessage);
router.get('/getConversations/:uid', controller.getAllConversations);

module.exports = router;