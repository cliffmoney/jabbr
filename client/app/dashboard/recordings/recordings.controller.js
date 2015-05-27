'use strict';

angular.module('jabbrApp')
  .controller('RecordingsCtrl', function ($scope, Auth, User, $stateParams) {
    $scope.userRecordings = [];
    $scope.oneRecording = undefined;
    $scope.foobar = 'barfoo';
    
    // ==========

    $scope.getUserRecordings = function() {
      User.getUserRecordings(function(res) {
        // console.log(res.recordings);
        $scope.userRecordings = res.recordings;
      });
    };

    $scope.getUserRecordings();
    // ==========
    $scope.getOneRecording = function() {
      User.getOneRecording(function(res) {
        console.log(res);
        // console.log(res.recording);
        $scope.oneRecording = res.recording;
      });
    };

    $scope.getOneRecording();
    // ===========

    $scope.parseDate = function(unixDate) {
      var foo = new Date(unixDate);
      return foo.toDateString();
    };


  });
