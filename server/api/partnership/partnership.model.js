'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PartnershipSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Partnership', PartnershipSchema);