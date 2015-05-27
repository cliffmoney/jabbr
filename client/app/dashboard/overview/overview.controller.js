'use strict';

angular.module('jabbrApp')
  .controller('OverviewCtrl', function ($scope, $state, User, Session, Message) {
    $scope.suggestedPartners = []; 
    $scope.messages = [];

  
    User.getSuggestedPartners(function(res) {
      $scope.suggestedPartners = res.partners;
    });

    // Message.fiveMostRecent({id: $scope.currentUser._id}, function(data) {
    //   $scope.messages = data.messages;
    // });

  

    $scope.viewProfile = function(partner) {
      $state.go('profile', { userId: partner._id });
    };
  });
