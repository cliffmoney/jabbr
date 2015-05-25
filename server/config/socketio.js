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
  // -----------SOCKET ON DISCONNECT END----------------

  //------------SOCKET ON INIT START--------------------
    socket.on('joinRoom', function(data){
      console.log('Joining Room: '+ data.roomid);
      currentRoom = (data.roomid || {}).room || uuid.v4();
      userIds[currentRoom] += 1;
      id = userIds[currentRoom];
      socket.emit('enterRoom', {'roomid': currentRoom, 'id':id})
      var room = rooms[currentRoom];
      room.forEach(function(s){
        s.emit('peer.connected',{'id':id});
      });
    });

    socket.on('createRoom', function(data){
      currentRoom = (data.roomid || {}).room || uuid.v4();
      console.log("Created Room: " + currentRoom);
      rooms[currentRoom] = [socket];
      id = userIds[currentRoom] = 0;
      socket.emit("newRoom", {roomid:currentRoom, 'id': id})
    });

    // socket.on('init', function (data) {
    //     console.log('Initiating Room Creation');
    //     currentRoom = (data || {}).room || uuid.v4();
    //     var room = rooms[currentRoom];
    //     console.log('The new room is: ' + room);
    //     if (!data) {
    //       console.log("Hello");
    //       rooms[currentRoom] = [socket];
    //       id = userIds[currentRoom] = 0;
    //       var roomInfo = {};
    //       roomInfo.currentRoom = currentRoom;
    //       roomInfo.id = id;
    //       socket.emit("newRoom", roomInfo);
    //       console.log('Room created, with #', currentRoom);
    //     } else {
    //       if (!room) {
    //         console.log("NO ROOM! :(")
    //         return;
    //       }
    //       userIds[currentRoom] += 1;
    //       id = userIds[currentRoom];
    //       var roomInfo = {};
    //       roomInfo.currentRoom = currentRoom;
    //       roomInfo.id = id;
    //       socket.emit("newRoom", roomInfo);
    //       room.forEach(function (s) {
    //         s.emit('peer.connected', { id: id });
    //       });
    //       room[id] = socket;
    //       console.log('Peer connected to room', currentRoom, 'with #', id);
    //     }
    //   });
  //------------SOCKET ON INIT END----------------------

  //------------SOCKET ON MSG START--------------------
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
  //------------SOCKET ON MSG END----------------------
  });
};