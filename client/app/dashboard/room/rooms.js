angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('roomId', {
        url: '/room/:roomId',
<<<<<<< HEAD:client/app/dashboard/room/rooms.js
        templateUrl: 'app/dashboard/room/views/room.html',
=======
        templateUrl: 'app/room/views/room.html',
>>>>>>> (FEAT) Video chat works on localhost; id is given for each room; can join or create rooms.:client/app/room/rooms.js
        controller: 'RoomCtrl'
      })
      .state('room',{
        url: '/room',
<<<<<<< HEAD:client/app/dashboard/room/rooms.js
        parent: 'dashboard',
        templateUrl: 'app/dashboard/room/views/room.html',
=======
        templateUrl: 'app/room/views/room.html',
>>>>>>> (FEAT) Video chat works on localhost; id is given for each room; can join or create rooms.:client/app/room/rooms.js
        controller: 'RoomCtrl'
      });
  });