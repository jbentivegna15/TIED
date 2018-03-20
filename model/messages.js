//model/messages.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
	_id: int,
	recipient_group: [{ group_id: int, event_id: int}],
	messages: [{ message: String }]
});

module.exports = mongoose.model('Message', messageSchema);