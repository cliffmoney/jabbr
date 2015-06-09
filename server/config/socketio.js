// SOCKET IO CONFIGURATION

'use strict';
var User = require('../api/user/user.model'),
    uuid = require('node-uuid'),
    rooms = {},
    userIds = {};
//audio stuff
var ss = require('socket.io-stream');
var saveRecording = require('../api/recording/recording');
var sendRecording = require('../api/recording/sendRecording')

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
    socket.on('checkRoom', function(data){
      // check if a room has already been created or not
      console.log('checking roomid ' + data.roomid);
      var roomid = data.roomid;
      if(rooms[roomid]){
        console.log('found the room');
        socket.emit('openRoom', {roomid: roomid})
      }
      else{createRoom(data);}

    });
    var createRoom = function(data){
      currentRoom = data.roomid || uuid.v4();
      console.log("Created Room: " + currentRoom);
      rooms[currentRoom] = [];
      socket.emit("openRoom", {roomid:currentRoom, 'id': id})
    };
  //------------SOCKET ON CREATE ROOM END---------------------

  //------------SOCKET ON JOINROOM START----------------------
    socket.on('joinRoom',function(data){
      console.log(data.roomid);
      currentRoom = data.roomid;
      if(userIds[currentRoom] === undefined) {
        id = userIds[currentRoom] = 0;  // first user of room assign id of zero
      } else {  // increment id number by one for every 
        userIds[currentRoom] += 1;
        id = userIds[currentRoom];
      }
      socket.emit('enterRoom', {'roomid': currentRoom, 'id':id})
      var room = rooms[currentRoom];
      room.forEach(function(s){
        s.emit('peer.connected',{'id':id});
      });
      room[id] = socket;
      console.log('Peer connected to room', currentRoom, 'with #', id);
    });
  //------------SOCKET ON JOINROOM END-----------------------

  //------------SOCKET ON LEAVEROOM START----------------------
    socket.on('leaveRoom', function(data) {
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
  //------------SOCKET ON LEAVEROOM START----------------------

  //------------SOCKET ON MSG START--------------------------
    socket.on('msg', function (data) {
      var to = parseInt(data.to, 10);
    //  console.log('Two variables: ' + rooms[currentRoom] + 'and' + rooms[currentRoom][to]);
      if (rooms[currentRoom] && rooms[currentRoom][to]) {
      //  console.log('Redirecting message to', to, 'by', data.by);
        rooms[currentRoom][to].emit('msg', data);
      } else {
        console.warn('Invalid user');
      }
    });
  //------------SOCKET ON MSG END----------------------------

  //------------SOCKET ON CHAT START------------------------
    socket.on('chat', function (data) {
      if(rooms[data.currentRoom]) {
        rooms[data.currentRoom].forEach(function (socket) {
          if(socket) {
            socket.emit('updateChat', data.msg);
          } else {
            console.log('no peer connections found in this room');
          }
        });
      } else {
        console.warn('Not in a valid room');
      }  
    });
  //------------SOCKET ON CHAT END-----------------------

  //------------SOCKET ON AUDIO START------------------------
    socket.on('audio', function(audio){
      var file = {
        audio : audio.dataURL,
        userId: audio.user.email,
        roomId: audio.roomid
      };
      saveRecording.writeToDisk(file);
    });
  //------------SOCKET ON AUDIO END--------------------------

  });
};

