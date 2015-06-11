'use strict';

angular.module('jabbrApp')
  .controller('RecordingsCtrl', function ($scope, $sce, $http, Auth, Recording,
                                          User, $stateParams, JabbrSocket) {
    // TODO: query Recordings collection for 
    //   audio associated with the current user
    $scope.userRecordings = [];
    // ==========

    Recording.get(function(res) {
      $scope.userRecordings = res.data;
    });

    $scope.parseDate = function(unixDate) {
      var foo = new Date(unixDate);
      return foo.toLocaleDateString();
    };

    $scope.parseTime = function(unixDate) {
      var foo = new Date(unixDate);
      return foo.toLocaleTimeString();
    };    
    
    $scope.audioUrl = function(filename) {
      return 'http://' + location.host + '/' + filename;
    };
  })

  .controller('RecordingCtrl', function ($scope, Auth, Recording,
                                         $stateParams, Audio) {
    $scope.userRecordings = [];
    $scope.Audio = Audio;

    // ==========
    // use $stateParams.recordingId
    Recording.get({ id: $stateParams.recordingId }, function(res) {
      $scope.userRecordings = [res];
    });
  


    $scope.parseTime = function(unixDate) {
      var foo = new Date(unixDate);
      return foo.toLocaleTimeString();
    };    

    $scope.parseDate = function(unixDate) {
      var foo = new Date(unixDate);
      return foo.toLocaleDateString();
    };
    
    
    $scope.audioUrl = function(filename) {
      return 'http://' + location.host + '/' + filename;
    };

});
