const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const middleWareController = require('../controllers/MiddlewareController');

router.get('/', middleWareController.verifyToken, userController.getAllUsers);
router.post('/:id', userController.deleteUser)

module.exports = router;