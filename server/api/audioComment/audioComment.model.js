'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AudioCommentSchema = new Schema({
  filename: String,
  comments: [{time: Number, body: String}]
});

module.exports = mongoose.model('AudioComment', AudioCommentSchema);