'use strict';

var _ = require('lodash');
var AudioComment = require('./audioComment.model');


// Get all comments for a recording
exports.show = function(req, res) {
  AudioComment.findOne({filename: req.params.id}, function (err, audioComment) {
    if(err) { return handleError(res, err); }
    if(!audioComment) { return res.send(404); }
    return res.json(audioComment);
  });
};

// Updates or creates a audioComments doc for a recording
exports.upsert = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  AudioComment.findOne({filename: req.body.filename}, function (err, audioComment) {
    if (err) { return handleError(res, err); }
    if(!audioComment) { 
      var comments = [];
      comments.push(req.body.comments);
      AudioComment.create({filename: req.body.filename, comments:comments}, function(err, recording) {
        if(err) { return handleError(res, err); }
        return res.json(201, audioComment);
      });
    } else {
      audioComment.comments.push(req.body.comments);
      audioComment.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, audioComment);
      });
    }
  });
};
// Removes a single comment from the recording
exports.remove = function(req, res) {
  AudioComment.findOne({filename: req.body.filename}, function (err, audioComment) {
    if(err) { return handleError(res, err); }
    if(!audioComment) { return res.send(404); }
    audioComment.comments.pull({_id: req.body.commentId});
    audioComment.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, audioComment);
    });
  });
};
// Deletes a audioComment from the DB.
exports.destroy = function(req, res) {
  AudioComment.findOne({filename: req.body.filename}, function (err, audioComment) {
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