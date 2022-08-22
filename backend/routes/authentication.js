const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/AuthenticationController');

router.post('/register', authenticationController.registerUser);

module.exports = router;