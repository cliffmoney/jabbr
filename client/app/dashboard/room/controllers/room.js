'use strict';

angular.module('jabbrApp')
  .controller('RoomCtrl', function ($sce, VideoStream, $location, $stateParams, $scope, Room, $state, JabbrSocket, Auth, Session) {

    if (!window.RTCPeerConnection || !navigator.getUserMedia) {
      $scope.error = 'WebRTC is not supported by your browser. You can try the app with Chrome and Firefox.';
      return;
    }

    var socket = JabbrSocket;
    var stream, recordAudio, recordPeerAudio;

    VideoStream.get()
    .then(function (s) {
      stream = s;
      recordAudio = RecordRTC(stream);
      Room.init(stream);
      stream = URL.createObjectURL(stream);
      if (!$stateParams.roomId) {
        Room.createRoom()
        .then(function (roomId) {
          $state.go('room', {roomId: roomId}, {location: true});
        });
      } else {
        console.log("Attemping to join: " + $stateParams.roomId);
        Room.joinRoom($stateParams.roomId);
      }
    }, function () {
      $scope.error = 'No audio/video permissions. Please refresh your browser and allow the audio/video capturing.';
    });

    $scope.peers = [];
    $scope.partner = '';
    Room.on('peer.stream', function (peer) {
      console.log('Client connected, adding new stream');
      $scope.peers.push({
        id: peer.id,
        stream: URL.createObjectURL(peer.stream)
      });
      recordPeerAudio = RecordRTC(peer.stream);
      $scope.partner = Session.getCurrentlyMessaging();
    });
    Room.on('peer.disconnected', function (peer) {
      console.log('Client disconnected, removing stream');
      $scope.peers = $scope.peers.filter(function (p) {
        return p.id !== peer.id;
      });
    });

    $scope.startDisabled = false;
    $scope.stopDisabled = true;

    $scope.getLocalVideo = function () {
      return $sce.trustAsResourceUrl(stream);
    };

    $scope.startRecording = function() {
      $scope.startDisabled = true;
      $scope.stopDisabled = false;
      recordAudio.startRecording();
      recordPeerAudio.startRecording();
    };

    $scope.stopRecording = function() {
      $scope.startDisabled = false;
      $scope.stopDisabled = true;
      recordAudio.stopRecording(function() {
         // get audio data-URL
         recordAudio.getDataURL(function(audioDataURL) {
             var files = {
                 audio: {
                     type: recordAudio.getBlob().type || 'audio/wav',
                     dataURL: audioDataURL
                 },
                 user: {
                   user: Auth.getCurrentUser()
                 }
             };
             socket.emit('audio', files);
          });
      });
      recordPeerAudio.stopRecording(function() {
         // get audio data-URL
         recordPeerAudio.getDataURL(function(audioDataURL) {
             var files = {
                 audio: {
                     type: recordPeerAudio.getBlob().type || 'audio/wav',
                     dataURL: audioDataURL
                 },
                 user: {
                   user: {email: "YOUR PARTNER"}
                 }
             };
             socket.emit('audio', files);
          });
      });
    };
    socket.on('savedAudio', function(fileName){
      console.log('Saved File' + fileName);
    })
  });