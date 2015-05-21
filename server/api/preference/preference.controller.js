'use strict';

var _ = require('lodash');
var Preference = require('./preference.model');

// Get list of preferences
exports.index = function(req, res) {
  Preference.find(function (err, preferences) {
    if(err) { return handleError(res, err); }
    return res.json(200, preferences);
  });
};

// Get a single preference
exports.show = function(req, res) {
  Preference.findById(req.params.id, function (err, preference) {
    if(err) { return handleError(res, err); }
    if(!preference) { return res.send(404); }
    return res.json(preference);
  });
};

// Creates a new preference in the DB.
exports.create = function(req, res) {
  Preference.create(req.body, function(err, preference) {
    if(err) { return handleError(res, err); }
    return res.json(201, preference);
  });
};

// Updates an existing preference in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Preference.findById(req.params.id, function (err, preference) {
    if (err) { return handleError(res, err); }
    if(!preference) { return res.send(404); }
    var updated = _.merge(preference, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, preference);
    });
  });
};

// Deletes a preference from the DB.
exports.destroy = function(req, res) {
  Preference.findById(req.params.id, function (err, preference) {
    if(err) { return handleError(res, err); }
    if(!preference) { return res.send(404); }
    preference.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}