const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/AuthenticationController');
const {verifyToken} = require('../controllers/MiddlewareController');

router.post('/register', authenticationController.registerUser);
router.post('/login', authenticationController.loginUser);
router.post('/refreshtoken', authenticationController.refreshToken);
router.post('/logout', verifyToken, authenticationController.logoutUser)

module.exports = router;