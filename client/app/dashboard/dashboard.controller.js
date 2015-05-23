'use strict';

angular.module('jabbrApp')
  .controller('DashboardCtrl', function ($scope, Auth, User, Session, $location) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.suggestedPartners = [];

    $scope.getSuggestedPartners = function() {
      User.getSuggestedPartners(function(res) {
        $scope.suggestedPartners = res.partners;
      });
    };

    $scope.getSuggestedPartners();

    $scope.messagePartner = function(partner) {
      Session.setCurrentlyMessaging(partner);
      $location.path('/messager');
    };
  });
