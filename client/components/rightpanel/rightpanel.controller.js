'use strict';

angular.module('jabbrApp')
  .controller('RightPanelCtrl', function ($scope, $location, Auth, User, $http,JabbrSocket, $state) {
    $scope.socket = JabbrSocket;

    $scope.partners = User.getPartners({id: $scope.currentUser._id});


    // upon clicking a partner, user gets taken to an overview of the partnership

    $scope.seePartnership = function(partner) {
      $state.go('partnership', {partnershipId: partner.partnershipId});
    };

    // $scope.seePartnership = function(partner) {
    //   $scope.socket.emit('checkRoom', {roomid: room});
    //   $scope.socket.on('openRoom', function(data){
    //     $state.go('roomId',{roomId: room});
    //   });
    //   $scope.socket.on('roomError', function(data){});
    // };
    

  });