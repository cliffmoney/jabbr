'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecordingSchema = new Schema({
  filename: String,
  creator: Object,
  partner: Object,
  date: Number
});

module.exports = mongoose.model('Recording', RecordingSchema);