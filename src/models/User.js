var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String
	},
	score: {
		type: Number
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;