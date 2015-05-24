'use strict';

angular.module('jabbrApp')
  .controller('DashboardCtrl', function ($scope, $state, Auth) {
    $scope.$state = $state; // so that current active states can easily be accessed
    $scope.currentUser = Auth.getCurrentUser(); // all child states inherit user object
    
  });
