'use strict';

angular.module('jabbrApp')
  .controller('PartnersCtrl', function ($scope, User, $state) {
    $scope.partners = User.getPartners({id: $scope.currentUser._id}, function(partners) {
      console.log(partners);
    });

    $scope.seePartnership = function(partnershipId) {
      $state.go('partnership', {partnershipId: partnershipId});
    }

  });
