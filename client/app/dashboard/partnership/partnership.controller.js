'use strict';

angular.module('jabbrApp')
  .controller('PartnershipCtrl', function ($scope, $routeParams, Partnership) {
    
    $scope.partnership = Partnership.get({id: $routeParams.partnershipId});
  });
