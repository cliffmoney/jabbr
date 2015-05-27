'use strict';

angular.module('jabbrApp')
  .controller('ProfileCtrl', function ($scope, $stateParams, User) {
    $scope.userProfile = {};

    User.getProfile({id: $stateParams.userId }, function(data) {
      $scope.userProfile = data.profile;
    });

  });
