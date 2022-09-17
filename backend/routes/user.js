const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const middleWareController = require('../controllers/MiddlewareController');

router.get('/', middleWareController.verifyToken, userController.getAllUsers);
router.delete('/:id', middleWareController.verifyTokenAndAdminAuth, userController.deleteUser)

module.exports = router;