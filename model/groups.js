//model/groups.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
	_id: int,
	name: String,
	events: [{
		_id: int
		name: String,
		date: String,
		time: String,
		loc: String,
		attendees: [{ _id: int }],
		description: String,
	}],
	description: String,
	img: String
});

module.exports = mongoose.model('Group', groupSchema);