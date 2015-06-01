'use strict';

angular.module('jabbrApp')
  .controller('RightPanelCtrl', function ($scope, User, $state, $interval) {

    var getPartners = function() {
      $scope.partners = User.getPartners({id: $scope.currentUser._id}, function(partners) {});
    };

    getPartners();  // get partners when controller first loads 
    
    // upon clicking a partner, user gets taken to an overview of the partnership
    $scope.seePartnership = function(partnershipId) {
      $state.go('partnership', {partnershipId: partnershipId});
    };

    var promise; // will store the promise in this variable
    $scope.start = function() {
      // stops any running interval to avoid two intervals running at the same time
      $scope.stop(); 
      // store the interval promise
      promise = $interval(getPartners, 100000); // every minute check for new partners
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