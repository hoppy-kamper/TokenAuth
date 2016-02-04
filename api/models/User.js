var mongoose = require('mongoose');
var bcyrpt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	email: String,
	password: String
})

exports.model = mongoose.model('User', UserSchema);

UserSchema.pre('save', function(next){
	var user = this;

	if(!user.isModified('password')) return next();

	bcyrpt.genSalt(10, function(err, salt){
		if (err) return next(err);

		bcyrpt.hash(user.password, salt, null, function(err, hash){
		if (err) return next(err);

		user.password = hash;
		next();

		})
	})


})