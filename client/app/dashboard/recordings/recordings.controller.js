'use strict';

angular.module('jabbrApp')
  .controller('RecordingsCtrl', function ($scope, Auth, Recording, 
                                          User, $stateParams) {
    $scope.userRecordings = [];
    $scope.oneRecording = undefined;
    $scope.foobar = 'barfoo';
    
    // ==========

    $scope.getUserRecordings = function() {
      Recording.getUserRecordings(function(res) {
        // console.log(res.recordings);
        console.log(456);
        $scope.userRecordings = res.recordings;
      });
    };

    $scope.getUserRecordings();
    // ==========
    $scope.getOneRecording = function() {
      Recording.show(function(res) {
        console.log(res);
        console.log(123);
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


  })
  .controller('RecordingCtrl', function ($scope, Auth, Recording, 
                                         $stateParams) {
    $scope.userRecordings = [];
    $scope.oneRecording = undefined;
    $scope.foobar = 'barfoo';
    
    // ==========

    $scope.getOneRecording = function() {
      Recording.show(function(res) {
        console.log(res);
        console.log(123);
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


  })
  ;
