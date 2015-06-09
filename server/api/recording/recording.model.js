'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecordingSchema = new Schema({
  filename: String,
  creator: String,
  partner: String,
  date: Number
});

module.exports = mongoose.model('Recording', RecordingSchema);