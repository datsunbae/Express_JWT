const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/AuthenticationController');
const middleWareController = require('../controllers/MiddlewareController');

router.post('/register', authenticationController.registerUser);
router.post('/login', authenticationController.loginUser);
router.post('/refreshtoken', middleWareController.verifyToken, authenticationController.refreshToken);

module.exports = router;