/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Preference = require('./preference.model');

exports.register = function(socket) {
  Preference.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Preference.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('preference:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('preference:remove', doc);
}