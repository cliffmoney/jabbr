'use strict';

angular.module('jabbrApp')
  .controller('ProfileCtrl', function ($scope, $stateParams, User, $http, Auth) {
    $scope.userProfile = {};
    $scope.isPartner;  // determines if a request button gets displayed
    $scope.notRespondedTo; // true if you haven't accepted this user's partnership request
    $scope.waitingOn; // true if this user hasn't accepted your partnership request
    
    $scope.partnerRequest = function() {
      $http.post('/api/partnerships', {
        requester: $scope.currentUser._id,
        recipient: $stateParams.userId,
        body: "You have a new language partner request!"
      }).success(function(data, status) {
        $scope.waitingOn = true;
      }).error(function(error) {
        console.log(error);
      });
    };


    // updates currentUser object to reflect the latest request data
    User.getRequests({id: $scope.currentUser._id}, function(requests) {
      $scope.currentUser.waitingOn = requests.waitingOn;
      $scope.currentUser.notRespondedTo = requests.notRespondedTo;
      // gets profile of requested user
      $scope.userProfile = User.getProfile({id: $stateParams.userId}, function(profile) {
        $scope.isPartner = Auth.isPartnerWith(profile._id); // are they partners?
        if(!$scope.isPartner) {  // if not is user waiting on this user's acceptance? 
          $scope.waitingOn = Auth.isAwaitingAcceptance(profile._id);
          if(!$scope.waitingOn) {  // if not has the user not responded to this user's request? 
            $scope.notRespondedTo = Auth.notRespondedTo(profile._id);
          }
        }
      });
    });
      
  });
