'use strict';

angular.module('jabbrApp')
  .controller('OverviewCtrl', function ($scope, $state, User, Message, $http, Partnership, $interval) {
    $scope.suggestedPartners = []; 
    $scope.messages = [];

  
    User.getSuggestedPartners(function(res) {
      console.log(res.partners);
      $scope.suggestedPartners = res.partners;
    });

    // Message.fiveMostRecent({id: $scope.currentUser._id}, function(data) {
    //   $scope.messages = data.messages;
    // });

    // get request for all messages for now, will refactor to fetch 5-10 most recent
    
    $http.get('/api/users/' + $scope.currentUser._id + '/messages')
      .success(function(messages, status) {
        $scope.messages = messages;
      }).error(function(error) {
        console.log(error);
      });
    
    $scope.acceptRequest = function(request) {
      Partnership.confirm({id: request._partnership}, {}, function(partnership) {
        $state.go($state.current, {}, {reload: true});
      });
    }
    $scope.viewProfile = function(partner) {
      $state.go('profile', { userId: partner._id });
    };
  });
