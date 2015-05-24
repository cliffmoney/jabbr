'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('roomId', {
        url: '/room/:roomId',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/room/views/room.html',
        controller: 'RoomCtrl'
      })
      .state('room',{
        url: '/room',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/room/views/room.html',
        controller: 'RoomCtrl'
      });
  });