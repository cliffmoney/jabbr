'use strict';

angular.module('jabbrApp')
  .controller('DashboardCtrl', function ($scope, Auth, User, Session, $location) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.suggestedPartners = [];

    $scope.getSuggestedPartners = function() {
      User.getSuggestedPartners(function(res) {
        console.log(res.partners)
        $scope.suggestedPartners = res.partners;
      });
    };

    $scope.getSuggestedPartners();

    $scope.messagePartner = function(userId) {
      Session.setCurrentlyMessaging(userId);
      console.log(userId);
      $location.path('/messager');
    }
  });
