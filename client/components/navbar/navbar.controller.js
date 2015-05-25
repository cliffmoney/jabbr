'use strict';

angular.module('jabbrApp')
  .controller('NavbarCtrl', function ($scope, $state, $location, Auth) {
    $scope.menu = [{
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $state.go('login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });