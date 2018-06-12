var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	id: String,
	email: String,
	name: String
});

const User = mongoose.model('users', userSchema);

module.exports = User;
