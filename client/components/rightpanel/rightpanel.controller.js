'use strict';

angular.module('jabbrApp')
  .controller('RightPanelCtrl', function ($scope, $location, Auth, User) {
    $scope.meetups = [{
      partnerName: "Bill Killmer",
      meetupTime: "11:00AM",
      meetupDate: "Saturday, May 23rd"
    },
    {
      partnerName: "Angela Wang",
      meetupTime: "11:00AM",
      meetupDate: "Saturday, May 24rd"
    }];
    $scope.user = Auth.getCurrentUser();

    // $scope.getMeetups = function() {
    //   User.getMeetups({ id: user._id 
    //     }, function(meetups) {
    //       $scope.meetups = meetups
    //     }, function(error) {
    //       console.log(error);
    //     }
    //   );
    // };

    // $scope.getMeetups();
  });