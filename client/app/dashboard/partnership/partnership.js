'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('partnership', {
        url: '/partnership/:partnershipId',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/partnership/partnership.html',
        controller: 'PartnershipCtrl'
      });
  });