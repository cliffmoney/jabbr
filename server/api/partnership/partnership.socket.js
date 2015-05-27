/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Partnership = require('./partnership.model');

exports.register = function(socket) {
  Partnership.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Partnership.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('partnership:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('partnership:remove', doc);
}