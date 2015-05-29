'use strict';

var _ = require('lodash');
var AudioComment = require('./audioComment.model');

// Get list of audioComments
exports.index = function(req, res) {
  AudioComment.find(function (err, audioComments) {
    if(err) { return handleError(res, err); }
    return res.json(200, audioComments);
  });
};

// Get a single audioComment
exports.show = function(req, res) {
  AudioComment.findById(req.params.id, function (err, audioComment) {
    if(err) { return handleError(res, err); }
    if(!audioComment) { return res.send(404); }
    return res.json(audioComment);
  });
};

// Creates a new audioComment in the DB.
exports.create = function(req, res) {
  AudioComment.create(req.body, function(err, audioComment) {
    if(err) { return handleError(res, err); }
    return res.json(201, audioComment);
  });
};

// Updates an existing audioComment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  AudioComment.findById(req.params.id, function (err, audioComment) {
    if (err) { return handleError(res, err); }
    if(!audioComment) { return res.send(404); }
    var updated = _.merge(audioComment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, audioComment);
    });
  });
};

// Deletes a audioComment from the DB.
exports.destroy = function(req, res) {
  AudioComment.findById(req.params.id, function (err, audioComment) {
    if(err) { return handleError(res, err); }
    if(!audioComment) { return res.send(404); }
    audioComment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}