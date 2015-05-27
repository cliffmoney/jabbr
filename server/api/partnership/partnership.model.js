'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PartnershipSchema = new Schema({
  requester: {type: Schema.ObjectId, ref: 'User'},
  recipient: {type: Schema.ObjectId, ref: 'User'},
  messages: [{type: Schema.ObjectId, ref: 'Message'}],
  room_id: {type: String, default: null},
  confirmed: {type: Boolean, default: false}
});

module.exports = mongoose.model('Partnership', PartnershipSchema);