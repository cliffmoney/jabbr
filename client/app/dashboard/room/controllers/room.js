'use strict';

angular.module('jabbrApp')
  .controller('RoomCtrl', function ($sce, VideoStream, $location, $stateParams, $scope, Room, $state, JabbrSocket, Auth, Session, $http) {
    //check if webrtc is supported 
    if (!window.RTCPeerConnection || !navigator.getUserMedia) {
      $scope.error = 'WebRTC is not supported by your browser. You can try the app with Chrome and Firefox.';
      return;
    }

    $scope.localVideo; 
    $scope.peer = {};
    $scope.partner = '';
    $scope.stopDisabled = true;
    var socket = JabbrSocket;
    var stream, peerstream, streamUrl,recordAudio, recordPeerAudio;
    var startedRecording = false;
    var roomId = location.pathname.split('/').pop();
    var user = Auth.getCurrentUser();

    VideoStream.once("streamReady", function(userMedia){
      stream = userMedia;
      stream.getAudioTracks()[0].enabled = true;
      recordAudio = RecordRTC(stream);
      Room.init(stream)
      streamUrl = URL.createObjectURL(stream);
      $scope.$apply(function(){
       $scope.localVideo = streamUrl
      });
      // console.log("The blobURL is: " + streamUrl);
      // console.log("Attempting to join: " + $stateParams.roomId);
      Room.joinRoom($stateParams.roomId);
    });

    VideoStream.get();
    
    Room.on('peer.stream', function (peer) {
      $scope.$apply(function(){
        console.log('Client connected, adding new stream');
        $scope.peer = {
          id: peer.id,
          stream: URL.createObjectURL(peer.stream)
        };
      })
      if(!startedRecording) {
        startedRecording = true;
        recordAudio.startRecording();
      }
      peerstream = peer.stream;
      $scope.partner = Session.getCurrentlyMessaging();
    });

    Room.on('peer.disconnected', function (peer) {
      stopRecording();
      startedRecording = false;
      console.log('Client disconnected, removing stream');
      $scope.$apply(function(){
        console.log("Removing Peer Video")
        $scope.peer.stream = ""; // peer's video disappears
      })
    });
    
    Room.on('leaving room', function() {
      if(startedRecording) {
        stopRecording();
        startedRecording = false;
      }
    })

    var stopRecording = function() {
      recordAudio.stopRecording(function() {
         // get audio data-URL
        recordAudio.getDataURL(function(audioDataURL) {
          var files = {
            type: recordAudio.getBlob().type || 'audio/wav',
            dataURL: audioDataURL,
            user: Auth.getCurrentUser(),
            roomId: roomId,     
          };
          socket.emit('audio', files);
        });
      });
    };
    
    $scope.muted = false;
    $scope.cameraOff = false;
    $scope.toggleAudio = function() {
      $scope.muted = !$scope.muted; 
      if(stream) {
        stream.getAudioTracks()[0].enabled =
         !(stream.getAudioTracks()[0].enabled);
      }
    }
    $scope.toggleVideo = function() {
      $scope.cameraOff = !$scope.cameraOff;
      if (stream) {
        stream.getVideoTracks()[0].enabled = 
        !(stream.getVideoTracks()[0].enabled);
      }
    }

  //-----------------CHAT AND TRANSLATE---------------//
  $scope.targetLanguages = $scope.currentUser.languagesLearning;
  $scope.msg = "";
  $scope.targetLanguage = $scope.targetLanguages[0];
  var languageMap = {
    'English': 'en',
    'Chinese': 'zh-CN',
    'Spanish': 'es',
    'Arabic': 'ar' 
  };

  $scope.sendMsg = function() {
    if($scope.msg !== "") {
      var languageCode = languageMap[$scope.targetLanguage.language];
      $http.post('/api/translate', {
        text: $scope.msg,
        targetLanguage: languageCode
      }).success(function(translation, status) {
        var data = {
          t: translation,
          o: $scope.msg,
          user: user.name
        };
        Room.sendMsg(data, $stateParams.roomId);
        $scope.msg = "";
      }).error(function(translation, status) {
        console.log("Error translating text with a status of " + status);
      });
    }

  };
  socket.on('updateChat', function(message) {
    $('#msgs').append('<li>' + message.user +" : "+ message.t + '</li>');
    $('#msgs').append('<li>' + message.user +" : (" + message.o + ')</li>');
  });
});
