'use strict';

angular.module('jabbrApp')
  .controller('RightPanelCtrl', function ($scope, $location, Auth, User, $http,JabbrSocket, $state) {
    $scope.socket = JabbrSocket;
    $scope.meetups = [];


    // get all rooms that belong to partnerships
    $scope.getMeetups = function() {
      $http.get('/api/users/' + $scope.currentUser._idmeetups')
        .success(function(data, status) {
          console.log(data.meetups);
          $scope.meetups = data.meetups;
        })
        .error(function(error) {
          console.log(error);
        });
    };

    // go to the room clicked on by the user
    $scope.enterRoom = function(room) {
      $scope.socket.emit('checkRoom', {user: $scope.currentUser._id, roomid: room});
      $scope.socket.on('openRoom', function(data){
        $state.go('roomId',{roomId: room});
      });
      $scope.socket.on('roomError', function(data){});
    };
    

  });