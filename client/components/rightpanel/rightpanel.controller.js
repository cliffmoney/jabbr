'use strict';

angular.module('jabbrApp')
  .controller('RightPanelCtrl', function ($scope, $location, Auth, User, $http,JabbrSocket, $state) {
    $scope.socket = JabbrSocket;
    $scope.meetups = [];


    // get all open video chat rooms (meetups)
    $scope.getMeetups = function() {
      $http.get('/api/users/meetups')
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
    $scope.getMeetups();

  });