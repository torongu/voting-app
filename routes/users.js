const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const isAuthenticated = require('../utils/isAuthenticated');

// user sign up account.
router.post('/signup', userController.signup);

// login route
router.post('/authenticate', userController.authenticate);

// change password
router.put('/changepassword', isAuthenticated, userController.changePassword);

module.exports = router;
