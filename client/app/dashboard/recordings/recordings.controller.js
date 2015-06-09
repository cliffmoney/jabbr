'use strict';

angular.module('jabbrApp')
  .controller('RecordingsCtrl', function ($scope, $sce, $http, Auth, Recording,
                                          User, $stateParams, JabbrSocket) {
    // TODO: query Recordings collection for 
    //   audio associated with the current user
    $scope.userRecordings = [];
    // ==========

    $scope.getUserRecordings = function() {
      Recording.getUserRecordings(function(res) {
        $scope.userRecordings = res.recordings;
      });
    };

    $scope.getUserRecordings();
    // ==========


    $scope.parseDate = function(unixDate) {
      var foo = new Date(unixDate);
      return foo.toDateString();
    };

    $scope.parseTime = function(unixDate) {
      var foo = new Date(unixDate);
      return foo.toLocaleTimeString();
    };    
    
    $scope.audioUrl = function(filename) {
      // console.log('location.host: ');
      // console.log(location.host);

      return 'http://' + location.host + '/' + filename;
    };
  })

  .controller('RecordingCtrl', function ($scope, Auth, Recording,
                                         $stateParams, Audio) {
    $scope.userRecordings = [];
    $scope.Audio = Audio;

    // ==========
    // use $stateParams.recordingId
    $scope.getOneRecording = function() {
      Recording.getOneRecording({ id: $stateParams.recordingId }, function(res) {
      
        // console.log(res.recording);
        $scope.userRecordings = [res];
      });
    };

    $scope.getOneRecording();

    $scope.parseTime = function(unixDate) {
      var foo = new Date(unixDate);
      return foo.toLocaleTimeString();
    };    

    $scope.parseDate = function(unixDate) {
      var foo = new Date(unixDate);
      return foo.toDateString();
    };
    
    
    $scope.audioUrl = function(filename) {
      // console.log('location.host: ');
      // console.log(location.host);
      return 'http://' + location.host + '/' + filename;
    };

});
