const express = require('express');
const passport = require('passport');
const router = express.Router();

const pollController = require('../controllers/PollController');
const respond = require('../utils/respond');
const isAuthenticated = require('../utils/isAuthenticated');

// get all polls
router.get('/poll', isAuthenticated, pollController.getAll, respond);

// load a poll
router.get('/poll/:poll_id', pollController.load, respond);

// create a poll
router.post('/poll', isAuthenticated, pollController.add, respond);

// update a poll
router.put('/poll/:poll_id', isAuthenticated, pollController.update, respond);

// vote a poll
router.put("/poll/:poll_id/vote/:answer_id", isAuthenticated, pollController.vote, respond);

// delete a poll
router.delete('/poll/:poll_id', isAuthenticated, pollController.delete, respond);

module.exports = router;
