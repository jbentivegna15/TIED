//model/groups.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
	name: String,
	events: [{
		name: String,
		date: String,
		time: String,
		loc: String,
		attendees: [{ _id: Schema.Types.Mixed}],
		description: String,
	}],
	description: String,
	img: String
});

module.exports = mongoose.model('Group', groupSchema);
