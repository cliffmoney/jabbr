'use strict';

angular.module('jabbrApp')
  .controller('MessagerCtrl', function ($scope, Auth, Session, $http) {
    $scope.currentlyMessaging = Session.getCurrentlyMessaging();
    $scope.message = {};
    
    $scope.videoInvite = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        $http.post('/api/users/invitations', {
          text: $scope.message.text,
          invited: $scope.currentlyMessaging._id
        })
        .success(function(data, status) {
          console.log("invitation sent!");
        })
        .error(function(error) {
          console.log(error);
        })
      }
    }

  });
