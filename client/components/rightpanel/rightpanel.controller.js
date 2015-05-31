'use strict';

angular.module('jabbrApp')
  .controller('RightPanelCtrl', function ($scope, $location, Auth, User, $http,JabbrSocket, $state) {
    $scope.socket = JabbrSocket;
    $scope.partnerships = [];


    $scope.partners = User.getPartners({id: $scope.currentUser._id}, function(partners) {
       console.log(partners);
    });

    // go to the room clicked on by the user
    $scope.enterRoom = function(room) {
      $scope.socket.emit('checkRoom', {roomid: room});
      $scope.socket.on('openRoom', function(data){
        $state.go('roomId',{roomId: room});
      });
      $scope.socket.on('roomError', function(data){});
    };
    

  });