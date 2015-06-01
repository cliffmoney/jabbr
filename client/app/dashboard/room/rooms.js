'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('roomId', {
        url: '/room/:roomId',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/room/views/room.html',
        controller: 'RoomCtrl',
        onExit: function(JabbrSocket, VideoStream, Room) {
          VideoStream.get()
          .then(function(stream) {
            stream.stop();   // stop webrtc stream
          });
          Room.leaveRoom();  // reset Room service variables
          JabbrSocket.disconnect();  // disconnect and then reestablish socket.io connection
          JabbrSocket.connect();
        }
      })
      .state('room',{
        url: '/room',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/room/views/room.html',
        controller: 'RoomCtrl'
      });
  });