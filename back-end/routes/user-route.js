const express = require('express');

const controller = require('../controllers/user-controller');

const router = express.Router();

router.post('/signup', controller.signUp);
router.post('/login', controller.login);
router.post('/search', controller.searchUser);

module.exports = router;