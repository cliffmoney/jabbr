// SOCKET IO CONFIGURATION

'use strict';

var uuid = require('node-uuid'),
    rooms = {},
    userIds = {};


module.exports = function (socketio) {

  socketio.on('connection', function (socket) {
    console.log("Client has Connected");
    socket.emit('firstContact');
    var currentRoom, id;

  // -----------SOCKET ON DISCONNECT START--------------
    socket.on('disconnect', function () {
      console.log("Client Disconnected");
      if (!currentRoom || !rooms[currentRoom]) {
        return;
      }
      delete rooms[currentRoom][rooms[currentRoom].indexOf(socket)];
      rooms[currentRoom].forEach(function (socket) {
        if (socket) {
          socket.emit('peer.disconnected', { id: id });
        }
      });
    });
  // -----------SOCKET ON DISCONNECT END----------------------

  //------------SOCKET ON CREATE ROOM START-------------------

    socket.on('createRoom', function(data){
      currentRoom = (data || {}).roomid || uuid.v4();
      console.log("Created Room: " + currentRoom);
      rooms[currentRoom] = [socket];
      id = userIds[currentRoom] = 0;
      socket.emit("newRoom", {roomid:currentRoom, 'id': id})
    });
  //------------SOCKET ON CREATE ROOM END---------------------
  //------------SOCKET ON JOINROOM START----------------------
    socket.on('joinRoom', function(data){
      currentRoom = data.roomid;
      userIds[currentRoom] += 1;
      id = userIds[currentRoom];
      socket.emit('enterRoom', {'roomid': currentRoom, 'id':id})
      var room = rooms[currentRoom];
      room.forEach(function(s){
        s.emit('peer.connected',{'id':id});
      });
      room[id] = socket;
      console.log('Peer connected to room', currentRoom, 'with #', id);
    });

  //------------SOCKET ON JOINROOM END-----------------------

  //------------SOCKET ON MSG START--------------------------
    socket.on('msg', function (data) {
      var to = parseInt(data.to, 10);
      console.log('Two variables: ' + rooms[currentRoom] + 'and' + rooms[currentRoom][to]);
      if (rooms[currentRoom] && rooms[currentRoom][to]) {
        console.log('Redirecting message to', to, 'by', data.by);
        rooms[currentRoom][to].emit('msg', data);
      } else {
        console.warn('Invalid user');
      }
    });
  //------------SOCKET ON MSG END----------------------------
  });
};