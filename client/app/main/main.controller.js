'use strict';

angular.module('jabbrApp')
  .controller('MainCtrl', function ($scope, $http, $location) {
    $scope.signup = function() {
      $location.path('/signup');
    }
  });
