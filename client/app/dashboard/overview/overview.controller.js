'use strict';

angular.module('jabbrApp')
  .controller('OverviewCtrl', function ($scope, $state, User, Message, $http, Partnership, $interval) {
    
    $scope.suggestedPartners = [];
    $scope.messages = [];

    User.getSuggestedPartners(function(res) {
      $scope.suggestedPartners = res.partners;
    });

    console.log($scope.suggestedPartners);

    $scope.acceptRequest = function(request) {
      Partnership.confirm({id: request._partnership}, {}, function(partnership) {
        $state.go($state.current, {}, {reload: true}); // reloads right panel to show new partner
      });
    };

    $scope.viewProfile = function(partner) {
      $state.go('profile', { userId: partner._id });
    };

    // gets all messages belonging to user
    var getMessages = function() {
      $http.get('/api/users/' + $scope.currentUser._id + '/messages')
        .success(function(messages, status) {
          $scope.messages = messages;
          console.log(messages);
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