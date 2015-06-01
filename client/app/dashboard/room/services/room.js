/* global RTCIceCandidate, RTCSessionDescription, RTCPeerConnection, EventEmitter */
'use strict';


angular.module('jabbrApp')
  .factory('Room', function ($rootScope, $q, JabbrSocket) {

    var connected = false;
    var socket = JabbrSocket;
    var iceConfig = { 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]},
        peerConnections = {},
        currentId, roomId,
        stream;

    function getPeerConnection(id) {
      if (peerConnections[id]) {
        return peerConnections[id];
      }
      var pc = new RTCPeerConnection(iceConfig);
      peerConnections[id] = pc;
      pc.addStream(stream);
      pc.onicecandidate = function (evnt) {
        socket.emit('msg', { by: currentId, to: id, ice: evnt.candidate, type: 'ice' });
      };
      pc.onaddstream = function (evnt) {
        console.log('Received new stream');
        api.trigger('peer.stream', [{
          id: id,
          stream: evnt.stream
        }]);
        if (!$rootScope.$$digest) {
          $rootScope.$apply();
        }
      };
      return pc;
    }

    function makeOffer(id) {
      var pc = getPeerConnection(id);
      pc.createOffer(function (sdp) {
        pc.setLocalDescription(sdp);
        console.log('Creating an offer for', id);
        socket.emit('msg', { by: currentId, to: id, sdp: sdp, type: 'sdp-offer' });
      }, function (e) {
        console.log(e);
      },
      { mandatory: { OfferToReceiveVideo: true, OfferToReceiveAudio: true }});
    }

    function handleMessage(data) {
      var pc = getPeerConnection(data.by);
      switch (data.type) {
        case 'sdp-offer':
          pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
            console.log('Setting remote description by offer');
            pc.createAnswer(function (sdp) {
              pc.setLocalDescription(sdp);
              socket.emit('msg', { by: currentId, to: data.by, sdp: sdp, type: 'sdp-answer' });
            });
          });
          break;
        case 'sdp-answer':
          pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
            console.log('Setting remote description by answer');
          }, function (e) {
            console.error(e);
          });
          break;
        case 'ice':
          if (data.ice) {
            console.log('Adding ice candidates');
            pc.addIceCandidate(new RTCIceCandidate(data.ice));
          }
          break;
      }
    }

    function closeConnection(id) {
      var pc = getPeerConnection(id);
      pc.close();
    }
    // var socket = Io.connect(config.SIGNALIG_SERVER_URL),
    //     connected = false;

    function addHandlers(socket) {
      socket.on('peer.connected', function (params) {
        makeOffer(params.id);
      });
      socket.on('peer.disconnected', function (data) {
        closeConnection(data.id);
        api.trigger('peer.disconnected', [data]);
        if (!$rootScope.$$digest) {
          $rootScope.$apply();
        }
      });
      socket.on('msg', function (data) {
        handleMessage(data);
      });
    }

    var api = {
      checkRoom: function(r){
        socket.emit('checkRoom', {roomid: r})
      },
      joinRoom: function (r) {
        if (!connected) {
          socket.emit('joinRoom', { roomid: r });
          socket.on('enterRoom', function(roomInfo){
            currentId = roomInfo.id;
            roomId = roomInfo.roomid;
            connected = true;
          });
          socket.on('roomError', function(error) {
            console.log(error.message);
          })
        }
      },
      createRoom: function () {
        var d = $q.defer();
        console.log('creating Room');
        socket.emit('createRoom', null);
        socket.on('newRoom', function(roomInfo){
          roomId = roomInfo.roomid;
          var id = roomInfo.id;
          d.resolve(roomId);
          console.log('Your roomId is:' + roomId);
          currentId = id;
          connected = true;
        });
        //   console.log("Server has created Room")
        //   d.resolve(roomid);
        //   roomId = roomid;
        //   currentId = id;
        //   connected = true;
        // });
        return d.promise;
      },
      init: function (s) {
        stream = s;
      },
      leaveRoom: function() {
        currentId = undefined;
        roomId = undefined;
        connected = false;
      }
    };
    EventEmitter.call(api);
    Object.setPrototypeOf(api, EventEmitter.prototype);

    addHandlers(socket);
    return api;
  });
