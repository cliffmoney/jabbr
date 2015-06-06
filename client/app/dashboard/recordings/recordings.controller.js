









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
<<<<<<< HEAD
      // console.log('location.host: ');
      // console.log(location.host);
=======
>>>>>>> add audio comment route to get, add and remove comments for a recording
      return 'http://' + location.host + '/' + filename;
    };
<<<<<<< HEAD
=======
    
    //audio commenting stuff
    // var id = '55721f57511d0cd025af0879';
    // var p;
    // var init = function() {
    //   $http.get('/api/recordings/'+id)
    //   .success(function(recording, status) {
    //     p = recording.popcorn || Popcorn('#sample');
    //   }).error(function() {
    //     console.log('Error getting recording');
    //   })
    // }
    $scope.audio = {};
    $scope.addComment = function(form) {
      if (form.$valid) {
        var time = p.currentTime();
        p.footnote({
           start: time,
           end: time + 2,
           text: $scope.audio.comment,
           target: "timeline"
         });
        $scope.audio.comment = '';
        $http.put('/api/recordings/'+id, {
          popcorn: p,
        }).success(function(recording, status) {
          console.log('Comment added to recording');
        }).error(function() {
          console.log('Error adding comment to recording');
        });
      }
    };
       
    // ==========


>>>>>>> working on audio commenting
    // $scope.recordingsURL = [];
    // var socket = JabbrSocket;
    // var currentUser = Auth.getCurrentUser();

    // ss(socket).removeAllListeners("sendRecording");

    // ss(socket).on("sendRecording", function(recording){
    //   recording.pipe(blobStream())
    //   .on('finish', function(){
    //     $scope.$apply(function(){
    //       var url = this.toBlobURL();
    //       $scope.recordingsURL.push(url);
    //     }.bind(this));
    //    });
    // });

    // ss(socket).emit("getRecording", currentUser.email);

  })
<<<<<<< HEAD
  .controller('RecordingCtrl', function ($scope, Auth, Recording,
                                         $stateParams) {
    $scope.userRecordings = [];
    $scope.oneRecording = undefined;

    // ==========
    // use $stateParams.recordingId
    $scope.getOneRecording = function() {
      Recording.getOneRecording({ id: $stateParams.recordingId }, function(res) {
        console.log(res);
        // console.log(res.recording);
        $scope.oneRecording = res;
=======
  .controller('RecordingCtrl', function ($scope, Auth, Recording, Audio,
                                         $stateParams) {

    //----------AUDIO COMMENT STUFF FOR TESTING---------------//
    Audio.get('test').then(function(res){
      console.log(res.data.comments);
    });

    $scope.comment = '';
    var pop = Popcorn('#test');
    $scope.addComment = function(comment) {
      var start = pop.currentTime();
      Audio.update('test', {
        time: start,
        body: $scope.comment
>>>>>>> add audio comment route to get, add and remove comments for a recording
      });
      $('#target').append('<li>'+$scope.comment+'</li>');
      $scope.comment = '';
    };
    //--------------------------------//

    // $scope.userRecordings = [];
    // $scope.oneRecording = undefined;
    // $scope.foobar = 'barfoo';

    // // ==========
    // // use $stateParams.recordingId
    // $scope.getOneRecording = function() {
    //   Recording.getOneRecording({ id: $stateParams.recordingId }, function(res) {
    //     // console.log(res.recording);
    //     $scope.oneRecording = res;
    //   });
    // };

    // $scope.getOneRecording();
    // // ===========

    // $scope.parseDate = function(unixDate) {
    //   var foo = new Date(unixDate);
    //   return foo.toDateString();
    // };

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
  ;
