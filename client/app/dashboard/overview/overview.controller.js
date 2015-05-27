'use strict';

angular.module('jabbrApp')
  .controller('OverviewCtrl', function ($scope, $state, User, Session, Message, $http) {
    $scope.suggestedPartners = []; 
    $scope.messages = [];

  
    User.getSuggestedPartners(function(res) {
      $scope.suggestedPartners = res.partners;
    });

    // Message.fiveMostRecent({id: $scope.currentUser._id}, function(data) {
    //   $scope.messages = data.messages;
    // });

    // get request for all messages for now, will refactor to fetch 5-10 most recent
    $http.get('/api/users/' + $scope.currentUser._id + '/messages')
      .success(function(data, status) {
        $scope.isAccepted = true;
      }).error(function(error) {
        console.log(error);
      });

    $scope.viewProfile = function(partner) {
      $state.go('profile', { userId: partner._id });
    };
  });
