var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	facebookID: String,
	facebookEmail: String,
	facebookName: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
