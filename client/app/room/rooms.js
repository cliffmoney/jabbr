angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('roomId', {
        url: '/room/:roomId',
        templateUrl: 'views/room.html',
        controller: 'RoomCtrl'
      })
      .state('room',{
        templateUrl: 'views/room.html',
        controller: 'RoomCtrl'
      });
  });