const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

// user sign up account.
router.post('/signup', userController.signup);

// login route
router.post('/authenticate', userController.authenticate);

module.exports = router;
