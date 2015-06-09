'use strict';

angular.module('jabbrApp')
  .controller('RoomCtrl', function ($sce, VideoStream, $location, $stateParams, $scope, Room, $state, JabbrSocket, Auth, Session, $http) {

    if (!window.RTCPeerConnection || !navigator.getUserMedia) {
      $scope.error = 'WebRTC is not supported by your browser. You can try the app with Chrome and Firefox.';
      return;
    }
    $scope.localVideo; 
    var socket = JabbrSocket;
    var stream, peerstream, streamUrl,recordAudio, recordPeerAudio;
    console.log('RoomCtrl Digest')
    VideoStream.once("streamReady", function(userMedia){
      stream = userMedia;

      Room.init(stream)
      streamUrl = URL.createObjectURL(stream);
      $scope.$apply(function(){
       $scope.localVideo = streamUrl
      });
      console.log("The blobURL is: " + streamUrl);
      console.log("Attempting to join: " + $stateParams.roomId);
      Room.joinRoom($stateParams.roomId);
    });
    VideoStream.get();
    
    $scope.peer = {};
    $scope.partner = '';
    Room.on('peer.stream', function (peer) {
      $scope.$apply(function(){
        console.log('Client connected, adding new stream');
        $scope.peer = {
          id: peer.id,
          stream: URL.createObjectURL(peer.stream)
        };
      })
      peerstream = peer.stream;
      $scope.partner = Session.getCurrentlyMessaging();

      console.log('roomId line 47: ');
      console.log(location.pathname.split('/').pop());
      console.log('scope peer: ');
      console.log($scope.peer);
      

    });
    Room.on('peer.disconnected', function (peer) {
      console.log('Client disconnected, removing stream');
      $scope.$apply(function(){
        console.log("Removing Peer Video")
        $scope.peer.stream = ""; // peer's video disappears
      })
    });

    $scope.stopDisabled = true;

    // $scope.getLocalVideo = function () {
    //   return $sce.trustAsResourceUrl(stream);
    // };
    var sendBothRecording = function(audioDataURL) {
      recordPeerAudio.stopRecording(function() {
        recordPeerAudio.getDataURL(function (peerAudioURL) {
          var files = {
            selfAudio: {
              type: recordAudio.getBlob().type || 'audio/wav',
              dataURL: audioDataURL
            },
            peerAudio: {
              type: recordPeerAudio.getBlob().type || 'audio/wav',
              dataURL: peerAudioURL
            },
            user: {
              user: Auth.getCurrentUser()
              // TODO: add peer email
            },
            room: location.pathname.split('/').pop()
          };
          socket.emit('audio', files);
        })
      })
    };

    $scope.startRecording = function() {
      recordAudio = RecordRTC(stream);
      recordPeerAudio = peerstream ? RecordRTC(peerstream) : "";
      $scope.stopDisabled = false;
      recordAudio.startRecording();
      recordPeerAudio && recordPeerAudio.startRecording();
    };

    $scope.stopRecording = function() {

      $scope.stopDisabled = true;
      
      //if peer exists, record both streams
      if(Object.keys(recordPeerAudio).length !== 0) {

        recordAudio.stopRecording(function() {
          recordAudio.getDataURL(function (audioDataURL) {
            sendBothRecording(audioDataURL);
          });
        });
      } else {
        //if no peer, record self only
        recordAudio.stopRecording(function() {
           // get audio data-URL
           recordAudio.getDataURL(function(audioDataURL) {
               var files = {
                   selfAudio: {
                       type: recordAudio.getBlob().type || 'audio/wav',
                       dataURL: audioDataURL
                   },
                   peerAudio: {},
                   user: {
                     user: Auth.getCurrentUser()
                   }
               };
               socket.emit('audio', files);
            });
        });
      }
    
    };

    socket.on("merged", function(filename) {
      console.log(filename + " successfully saved to database");
    });
    
    $scope.toggleAudio = function() {
      stream.getAudioTracks()[0].enabled =
         !(stream.getAudioTracks()[0].enabled);
    }
  //-----chat stuff-----//
  $scope.user = Auth.getCurrentUser();
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
          user: $scope.user.name
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
