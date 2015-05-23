'use strict';

angular.module('jabbrApp')
  .controller('RightPanelCtrl', function ($scope, $location, Auth, User, $http) {
    $scope.meetups = [];


    $scope.getMeetups = function() {
      $http.get('/api/users/meetups')
        .success(function(data, status) {
          console.log(data.meetups);
        })
        .error(function(error) {
          console.log(error);
        });
    };

    $scope.getMeetups();
  });