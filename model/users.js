//model/users.js
'use strict';
//import dependency
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	user: { type: String, unique: false },
	uniqueId: String,
	firstname: String,
	lastname: String,
	email: String,
	rsvps: [{ group_id: '', events: []}],
	admins: []
});
//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
