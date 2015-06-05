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
          console.log(VideoStream.userMedia)
          if(VideoStream.userMedia){
            VideoStream.userMedia.stop();
            VideoStream.userMedia = "";
            console.log("Exiting Room")
          }
          Room.leaveRoom();  // reset Room service variables
        }
      })
  });