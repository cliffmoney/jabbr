'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecordingSchema = new Schema({
  url: String,
  creator: String,
  partner: String
});

module.exports = mongoose.model('Recording', RecordingSchema);