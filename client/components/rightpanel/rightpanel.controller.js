'use strict';

angular.module('jabbrApp')
  .controller('RightPanelCtrl', function ($scope, $location, Auth, User, $http) {
    $scope.meetups = [];

    // get all open video chat rooms (meetups)
    $scope.getMeetups = function() {
      $http.get('/api/users/meetups')
        .success(function(data, status) {
          $scope.meetups = data.meetups;
        })
        .error(function(error) {
          console.log(error);
        });
    };

    // go to the room clicked on by the user
    $scope.enterRoom = function(room) {
      $location.path('/room/' + room);
    }
    $scope.getMeetups();
  });