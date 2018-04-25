//model/groups.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
	name: String,
	admins: [],
	rqadmins: [],
	events: [{
		name: String,
		date: String,
		time: String,
		loc: String,
		attendees: [],
		description: String,
	}],
	description: String,
	img: String
});

module.exports = mongoose.model('Group', groupSchema);
