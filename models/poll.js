const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	question: {
		type: String,
		required: true
	},
	answers: [
		{
			answer: {
				type: String,
				required: true
			},
			vote: {
				type: Number,
				required: true,
				default: 0
			}
		}
	]
});

const Poll = mongoose.model("poll", pollSchema);
module.exports = Poll;
