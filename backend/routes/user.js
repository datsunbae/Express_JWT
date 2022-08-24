const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.getAllUsers);
router.post('/:id', userController.deleteUser)

module.exports = router;