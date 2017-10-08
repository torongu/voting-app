const passport = require('passport');

module.exports = function(req, res, next) {
  passport.authenticate('jwt', function(err, user) {
    if (err || !user) {
      return res.status(403).send({
        message: 'Permission denied'
      });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next)
}
