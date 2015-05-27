'use strict';

angular.module('jabbrApp')
  .controller('RightPanelCtrl', function ($scope, $location, Auth, User, $http,JabbrSocket, $state) {
    $scope.socket = JabbrSocket;
    $scope.partnerships = [];


    // get all partnerships that have a room
    $scope.getRooms = function() {
      $http.get('/api/users/' + $scope.currentUser._id + '/partnerships')
        .success(function(partnerships, status) {
          console.log(partnerships);
          $scope.partnerships = partnerships;
        })
        .error(function(error) {
          console.log(error);
        });
    };

    $scope.getRooms();

    // go to the room clicked on by the user
    $scope.enterRoom = function(room) {
      $scope.socket.emit('checkRoom', {roomid: room});
      $scope.socket.on('openRoom', function(data){
        $state.go('roomId',{roomId: room});
      });
      $scope.socket.on('roomError', function(data){});
    };
    

  });