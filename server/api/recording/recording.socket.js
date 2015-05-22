/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Recording = require('./recording.model');

exports.register = function(socket) {
  Recording.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Recording.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('recording:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('recording:remove', doc);
}