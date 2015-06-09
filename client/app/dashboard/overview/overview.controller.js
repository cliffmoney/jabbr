'use strict';

angular.module('jabbrApp')
  .controller('OverviewCtrl', function ($scope, $state, User, Message, $http, Partnership, $interval) {
    
    $scope.suggestedPartners = [];
    $scope.messages = []; 
    $scope.submitted = false; // for showing errors appropriately in the form 
    $scope.responseText = '';

    User.getSuggestedPartners(function(res) {
      $scope.suggestedPartners = res.partners;
    });

    //console.log($scope.suggestedPartners);

    // sends request acceptance
    $scope.acceptRequest = function(form, partnershipId, text) {
      $scope.submitted = true;
      if(form.$valid) {
        Partnership.confirm({id: partnershipId}, {
            text: text
          }, function(partnership) {
          $state.go($state.current, {}, {reload: true}); // reloads right panel to show new partner
        });
      }
    };

    $scope.seePartnership = function(partnershipId) {
      $state.go('partnership', {partnershipId: partnershipId});
    }

    // sends a regular message 
    $scope.sendMessage = function(form, fromId, text) {
      $scope.submitted = true;
      if(form.$valid) {

      }
    };

    $scope.sortMessage = function(message) {  // used to sort the messages by date
      var date = new Date(message.timestamp);
      return date;
    };


    // sends a put request to server to mark message as seen, if it is not already seen
    $scope.markSeen = function(message) {
      if(!message.seen) {
        message.seen = true; // update in current DOM 
        Message.update({id: message._id}, {seen: true}); // update in server 
      }

    }

    $scope.viewProfile = function(partner) {
      $state.go('profile', { userId: partner._id });
    };

    // gets all messages belonging to user
    var getMessages = function() {
      $http.get('/api/users/' + $scope.currentUser._id + '/messages')
        .success(function(messages, status) {
          $scope.messages = messages;
        }).error(function(error) {
          console.log(error);
        });
    };

    getMessages();  // run once when controller loads
  
    var promise; // will store the promise in this variable
    $scope.start = function() {
      // stops any running interval to avoid two intervals running at the same time
      $scope.stop(); 
      // store the interval promise
      promise = $interval(getMessages, 8000);
    };

    // stops the interval
    $scope.stop = function() {
      $interval.cancel(promise);
    };
     
    $scope.start(); // starts the getting messages interval

    $scope.$on('$destroy', function() {
      $scope.stop();  // cancels the getting messages interval when user leaves this controller
    });

});