'use strict';

angular.module('jabbrApp')
  .controller('RecordingsCtrl', function ($scope, Auth, User) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.userRecordings = [];

    $scope.getUserRecordings = function() {
      User.getUserRecordings(function(res) {
        console.log(res.recordings);
        $scope.userRecordings = res.recordings;
      });
    };

    $scope.getUserRecordings();


  });
