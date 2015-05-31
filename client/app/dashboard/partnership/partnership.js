'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('partnership', {
        url: '/dashboard/partnership/:partnershipId',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/partnership/partnership.html',
        controller: 'PartnershipCtrl'
      });
  });