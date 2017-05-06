var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	username: {
		type: String
	},
	message: {
		type: String
	}
});

var Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;