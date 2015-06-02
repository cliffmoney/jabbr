'use strict';

angular.module('jabbrApp')
  .controller('ProfileCtrl', function ($scope, $stateParams, User, $http, Auth) {
    $scope.userProfile = {};
    $scope.isPartner;  // determines if a request button gets displayed
    
    $scope.partnerRequest = function() {
      $http.post('/api/partnerships', {
        requester: $scope.currentUser._id,
        recipient: $stateParams.userId,
        body: "You have a new language partner request!"
      }).success(function(data, status) {
        $scope.successfulRequest = true;
      }).error(function(error) {
        console.log(error);
      });
    };


    // gets profile of requested user
    // checks if current user is already partners with this user
    $scope.userProfile = User.getProfile({id: $stateParams.userId}, function(profile) {
      $scope.isPartner = Auth.isPartnerWith(profile._id);
    });
    
      
  });
