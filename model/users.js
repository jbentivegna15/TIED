//model/users.js
'use strict';
//import dependency
var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	user: { type: String, unique: false },
	uniqueId: String,
	test: String,
	password: String,
	firstname: String,
	lastname: String,
	email: String,
	admin_groups: [{ _id: Schema.Types.ObjectId}],
	private_groups: [{ _id: Schema.Types.ObjectId}],
	rsvps: [{ group_id: Schema.Types.ObjectId, event_id: Schema.Types.ObjectId}]
});
//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
