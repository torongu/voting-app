const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');
const config = require('../config/database');

module.exports = {
    signup: function(req, res, next) {
        var errors = {};
        var name = req.body.name,
            email = req.body.email,
            password = req.body.password,
            password2 = req.body.password2;

        if (!name || !email || !password || !password2) {
          return res.json({
            success: false,
            message: "Missing credentials"
          });
        }

        req.checkBody('email', 'Email not valid').isEmail();
        req.checkBody('password2', 'Password does not match.').equals(req.body.password);
        errors = req.validationErrors();

        if (errors) {
            res.json({success: false, errors: errors});
        } else {
            User.findOne({email})
            .exec()
            .then(function(user) {
                if (user) {
                    return res.json({
                        success: false,
                        message: 'Email has already been taken.',
                        name: name,
                        email: email
                    });

                } else {

                    const userNew = new User({
                        name: name,
                        email: email,
                        password: password
                    });

                    userNew.save().then(function(user) {
                      let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email
                      }, config.secret, {
                        expiresIn: 604000
                      });

                      return res.json({
                        success: true,
                        message: 'Register successfully.',
                        token: token,
                        user: user
                      });
                    }).catch(function(err) {
                        return next(err);
                    });

                }
            })
            .catch(function(err) {
                return next(err);
            })
        }
    },

    authenticate: function(req, res, next) {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
          return res.json({
            success: false,
            message: "Missing credentials"
          });
        }

        User.findUserByEmail(email, function (err, user) {
            if (err) throw err;
            if (!user) {
                return res.json({
                    success: false,
                    message: 'User not found.'
                });
            } else {
                User.comparePassword(password, user.password, function(err, isMatch) {
                    if (err) throw err;

                    if (isMatch) {
                        let token = jwt.sign({
                          _id: user._id,
                          name: user.name,
                          email: user.email
                        }, config.secret, {
                          expiresIn: 604000
                        });

                        return res.json({
                            success: true,
                            message: 'Login sucessfully.',
                            token: "JWT " + token,
                            user: {
                              _id: user._id,
                              name: user.name,
                              email: user.email
                            }
                        });
                    } else {
                        return res.json({
                            success: false,
                            message: 'Wrong password.'
                        });
                    }
                })
            }
        });
    }

}
