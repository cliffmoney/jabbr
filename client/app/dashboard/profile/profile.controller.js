'use strict';

angular.module('jabbrApp')
  .controller('ProfileCtrl', function ($scope, $stateParams, User, $http) {
    $scope.userProfile = {};

    $scope.partnerRequest = function() {
      $http.post('/api/users/' + $scope.currentUser._id + '/partnerships', {
        requester: $scope.currentUser._id,
        recipient: $stateParams.userId,
        body: "You have a new language partner request!"
      }).success(function(data, status) {
        $scope.successfulRequest = true;
      }).error(function(error) {
        console.log(error);
      });
    }

    // User.getProfile({id: $stateParams.userId},
    //   function(profile) {
    //     $scope.userProfile = profile;
    //     console.log($scope.userProfile);
    //   }, function(error) {
    //     console.log(error);
    //   }
    // );

  });
