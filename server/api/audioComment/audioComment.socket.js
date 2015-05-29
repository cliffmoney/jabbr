/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var AudioComment = require('./audioComment.model');

exports.register = function(socket) {
  AudioComment.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  AudioComment.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('audioComment:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('audioComment:remove', doc);
}