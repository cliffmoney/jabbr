'use strict';

angular.module('jabbrApp')
  .controller('DashboardCtrl', function ($scope, Auth) {
    $scope.message = 'Hello';
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
