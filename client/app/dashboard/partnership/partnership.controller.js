'use strict';

angular.module('jabbrApp')
  .controller('PartnershipCtrl', function ($scope, $stateParams, Partnership, JabbrSocket, $state) {
    
    $scope.socket = JabbrSocket;
    $scope.partnership = Partnership.get({id: $stateParams.partnershipId}, function(partnership){
      console.log(partnership);
    });

    $scope.enterRoom = function(room_id) {
      $scope.socket.emit('checkRoom', {roomid: room_id});
      $scope.socket.on('openRoom', function(data){
        $state.go('roomId',{roomId: room_id});
      });
      $scope.socket.on('roomError', function(data){});
    };


  });
