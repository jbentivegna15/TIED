//model/users.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	user: String,
	password: String,
	firstname: String,
	lastname: String,
	email: String,
	admin_groups: [{ _id: Schema.Types.ObjectId}],
	private_groups: [{ _id: Schema.Types.ObjectId}],
	rsvps: [{ group_id: Schema.Types.ObjectId, event_id: Schema.Types.ObjectId}],
	messages: [{ _id: Schema.Types.ObjectId }]
});

module.exports = mongoose.model('User', userSchema);
