//model/users.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	_id: int,
	name: String,
	password: String,
	admin_groups: [{ _id: int}],
	private_groups: [{ _id, int}],
	rsvps: [{ group_id: int, event_id: int}],
	messages: [{ _id: int }]
});

module.exports = mongoose.model('User', userSchema);