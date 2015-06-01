'use strict';

angular.module('jabbrApp')
  .controller('RightPanelCtrl', function ($scope, $location, Auth, User, $http, JabbrSocket, $state) {
    $scope.socket = JabbrSocket;

    $scope.partners = User.getPartners({id: $scope.currentUser._id});


    // upon clicking a partner, user gets taken to an overview of the partnership

    $scope.seePartnership = function(partnershipId) {
      $state.go('partnership', {partnershipId: partnershipId});
    };

    
    

  });