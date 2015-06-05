'use strict';

angular.module('jabbrApp')
  .controller('PartnershipCtrl', function ($scope, $stateParams, Partnership, JabbrSocket, $state, Message) {
    
    $scope.messageFormOpen = false;
    $scope.messageText = '';
    $scope.submitted = false;
    $scope.socket = JabbrSocket;
    $scope.partnership = Partnership.get({id: $stateParams.partnershipId}, function(partnership){
      console.log(partnership);
    });

    $scope.sortMessage = function(message) {  // used to sort the messages by date
      var date = new Date(message.timestamp);
      return date;
    };

    // sets sender name for each message
    $scope.getSenderName = function(fromId) {
      if(fromId === $scope.partnership.partner._id) {
        return $scope.partnership.partner.name;  
      } else {
        return "You";
      }
    };

    $scope.sendMessage = function(form, messageText) {
      Message.save({
        body: messageText,
        from: $scope.currentUser._id,
        to: $scope.partnership.partner._id,
        timestamp: Date.now(),
        type: 'normal',
        _partnership: $scope.partnership._id
      }, function(message) {
        $state.go($state.current, {}, {reload: true});
      })
    }

    

    $scope.enterRoom = function(room_id) {
      $scope.socket.emit('checkRoom', {roomid: room_id});
      $scope.socket.on('openRoom', function(data){
        console.log("Allowed to enter room with id " + data.roomid);
        console.log("This should match above: " + room_id);
        $state.go('roomId',{roomId: room_id});
      });
      $scope.socket.on('roomError', function(data){});
    };


  });
