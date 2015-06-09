'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecordingSchema = new Schema({
  filename: String,
  belongsTo: [String],
  date: Number
});

module.exports = mongoose.model('Recording', RecordingSchema);