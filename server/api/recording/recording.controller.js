'use strict';

var _ = require('lodash');
var Recording = require('./recording.model');

// Get list of recordings
exports.index = function(req, res) {
  Recording.find(function (err, recordings) {
    if(err) { return handleError(res, err); }
    return res.json(200, recordings);
  });
};

// Get a single recording
exports.show = function(req, res) {
  Recording.findById(req.params.id, function (err, recording) {
    if(err) { return handleError(res, err); }
    if(!recording) { return res.send(404); }
    return res.json(recording);
  });
};

// Creates a new recording in the DB.
exports.create = function(req, res) {
  Recording.create(req.body, function(err, recording) {
    if(err) { return handleError(res, err); }
    return res.json(201, recording);
  });
};

// Updates an existing recording in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Recording.findById(req.params.id, function (err, recording) {
    if (err) { return handleError(res, err); }
    if(!recording) { return res.send(404); }
    var updated = _.merge(recording, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, recording);
    });
  });
};

// Deletes a recording from the DB.
exports.destroy = function(req, res) {
  Recording.findById(req.params.id, function (err, recording) {
    if(err) { return handleError(res, err); }
    if(!recording) { return res.send(404); }
    recording.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}