const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required:true,
	},
	resetPasswordToken: {
		type: String,
	},
	resetPasswordExpires: {
		type: Date,
	},
},{
	timestamps: true,
});

UserSchema.pre('save', function(next) {
	const user = this;
	const SALT_FACTOR = 5;

	if(!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(SALT_FACTOR, function (error, salt) {
		if(error) {
			return next(error);
		}
		bcrypt.hash(user.password,salt,null, function(error,hash) {
			if(error) {
				return next(error);
			}
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (password, next) {
	bcrypt.compare(password, this.password, function (error, isMatch) {
		if(error) {
			return next(error, false);
		}
		return next(null, isMatch);
	})
}

module.exports = mongoose.model('User', UserSchema);