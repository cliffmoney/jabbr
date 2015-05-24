'use strict';

angular.module('jabbrApp')
  .controller('OverviewCtrl', function ($scope, $state, User, Session, $location) {
    $scope.suggestedPartners = [];

    $scope.getSuggestedPartners = function() {
      User.getSuggestedPartners(function(res) {
        $scope.suggestedPartners = res.partners;
      });
    };

    $scope.getSuggestedPartners();

    $scope.messagePartner = function(partner) {
      Session.setCurrentlyMessaging(partner);
      $state.go('messager');
    };
  });
