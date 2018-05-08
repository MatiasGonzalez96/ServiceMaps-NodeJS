var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	provider: String,
	provider_id: {type: String, unique: true},
	photo: String,
	createdAt: {type: Date, default: Date.now}
});

var User = mongoose.model('User', UserSchema);
