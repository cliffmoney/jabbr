'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Message = require('../message/message.model.js')

var PartnershipSchema = new Schema({
  requester: {type: Schema.ObjectId, ref: 'User'},
  recipient: {type: Schema.ObjectId, ref: 'User'},
  messages: [{type: Schema.ObjectId, ref: 'Message'}],
  room_id: {type: String, default: null},
  confirmed: {type: Boolean, default: false}
});

PartnershipSchema.methods = {
  sendConfirmation: function() {
    var partnership = this; // to save context for updating later
    Message.create({
      type: 'requestAccept',
      from: partnership.recipient,
      to: partnership.requester
    }, function(err, message) {
      if(err) throw err;
      partnership.update({$push: {messages: message._id}}, {safe: true}, function(err, partnership) {
        if(err) throw err;
      });
    });
  }
};

PartnershipSchema.index({'requester': 1});
PartnershipSchema.index({'recipient': 1});

module.exports = mongoose.model('Partnership', PartnershipSchema);
