const Poll = require('../models/poll');

module.exports = {
    getAll: function(req, res, next) {
        let userId = req.user._id;

        Poll.find({ user_id: {_id: userId} })
          .populate("user_id")
          .then(function(poll) {
              req.results = poll;
              next();
          })
          .catch(function(err) {
              next(err);
          });
    },

    load: function(req, res, next) {
        let id = req.params.poll_id;

        Poll.findOne({_id: id})
          .populate('user_id')
          .then(function(poll) {
            if (!poll) {
              req.success = false;
              req.results = {};
              return next();
            }

            req.success = true;
            req.results = poll;
            return next();
          })
          .catch(err => next(err));
    },

    add: function(req, res, next) {
        let poll = {};
        poll.user_id = req.user._id;
        poll.question = req.body.question;
        poll.answers = req.body.answers;

        if (!poll.question || !poll.answers) {
          req.success = false;
          req.message = "Missing credentials."
          return next();
        } else {
          poll.answers.forEach(function(item) {
            if (!item.answer) {
              req.success = false;
              req.message = "Missing credentials."
              return next();
            }
          })
        }

        let newPoll = new Poll(poll);
        newPoll.save().then(function(poll) {
          req.success = true;
          req.message = "Created a poll.";
          req.results = poll;
          return next();
        })
        .catch(function(err) {
          return next(err);
        });
    },

    update: function(req, res, next) {
        let id = req.params.poll_id;
        let updateQuestion = req.body.question;
        let answer = req.body.answer;

        Poll.findOne({_id: id})
        .exec()
        .then(function(poll) {
            if (updateQuestion) {
                poll.question = updateQuestion;
            }
            if (answer) {
                poll.answers.push({answer: answer});
            }

            poll.save().then(function(result) {
                req.success = true;
                req.message = "updated poll.";
                req.results = result;
                next();
            })
            .catch(function(err) {
                next(err);
            })
        })
        .catch(function(err) {
            next(err);
        });
    },

    vote: function(req, res, next) {
      let pollId = req.params.poll_id;
  		let answerId = req.params.answer_id;

  		Poll.findOne({_id: pollId})
        .then(function(poll) {
          for (let i = 0; i < poll.answers.length; i++) {
            if (poll.answers[i]._id == answerId) {
              poll.answers[i].vote += 1;
            }
          }

          poll.save()
            .then(function(result) {
              req.success = true;
              req.results = result;
              return next();
            }).catch(function(err) {
              return next(err);
            })
        }).catch(function(err) {
          return next(err);
        })
    },

    delete: function(req, res, next) {
        let id = req.params.poll_id;
        let user = req.user;

        Poll.findOne({_id: id})
        .populate("user_id")
        .then(function(poll) {
            if (!poll) {
              req.success = false;
              req.message = "Poll does not exist.";
              return next();
            } else {
                if (user._id.equals(poll.user_id._id)) {
                  Poll.remove({_id: id}, function(err, poll) {
                    if (err) {
                      return next(err);
                    }

                    req.success = true;
                    req.message = "Deleted poll.";
                    req.results = poll;
                    return next();
                  });
                } else {
                  req.success = false;
                  req.message = "You do not have permisson to delete this poll.";
                  return next();
                }
            }
        }).catch(function(err) {
          return next(err);
        })
    }

}
