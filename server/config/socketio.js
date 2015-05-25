// SOCKET IO CONFIGURATION

'use strict';
var User = require('../api/user/user.model');
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
    socket.on('checkRoom', function(data){
      //user has invitation if room exists && user has invitation
      var user = data.user;
      var roomid = data.roomid;
      User.findById(user, function(err, user) {
        if(err || !user){socket.emit('roomError',err)}
        else{
          var isInvited = false;
          for(var i = 0; user.invitations.length; i++){
            if(user.invitations[i].room === roomid ){
              isInvited = true;
            }
          }
          if(isInvited){
            if(rooms[roomid]){socket.emit('openRoom')}
            else{createRoom(data);}
          }
          else {socket.emit('roomError',err)}
        }
      });
      //if room doesnt exist && user has invitation
      createRoom(data);
    })
    var createRoom = function(data){
      currentRoom = data.roomid || uuid.v4();
      console.log("Created Room: " + currentRoom);
      rooms[currentRoom] = [socket];
      id = userIds[currentRoom] = 0;
      socket.emit("openRoom", {roomid:currentRoom, 'id': id})
    };
  //------------SOCKET ON CREATE ROOM END---------------------
  //------------SOCKET ON JOINROOM START----------------------
    socket.on('joinRoom')(function(data){
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