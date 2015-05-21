'use strict';

angular.module('jabbrApp')
  .controller('rightPanelCtrl', function ($scope, $location, Auth) {
    $scope.meetups = [{
      partnerName = "Bill Killmer",
      meetupTime = "11:00AM",
      meetupDate = "Saturday, May 23rd"
    },
    {
      partnerName = "Angela Wang",
      meetupTime = "11:00AM",
      meetupDate = "Saturday, May 24rd"
    }];
  });