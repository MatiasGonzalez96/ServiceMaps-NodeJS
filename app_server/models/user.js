var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	id: String,
	email: String,
	name: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
