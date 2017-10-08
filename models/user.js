const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

userSchema.pre('save', function (next) {
	var user = this;
	bcrypt.genSalt(10, function (err, satl) {
		bcrypt.hash(user.password, satl)
			.then(function (hash) {
				user.password = hash;
				next();
			})
			.catch(function () {
				return next(err);
			})
	});
});

userSchema.statics.findUserByEmail = function(email, callback) {
	User.findOne({email: email}, function(err, user) {
		if (err) return callback(err);

		return callback(null, user);
	});
}

userSchema.statics.comparePassword = function(candidatePassword, hashPassword, callback) {
	bcrypt.compare(candidatePassword, hashPassword, function(err, isMatch) {
		if (err) throw err;

		return callback(null, isMatch);
	})
}

const User = mongoose.model('user', userSchema);
module.exports = User;