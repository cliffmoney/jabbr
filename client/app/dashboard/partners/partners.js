'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('partners', {
        url: '/partners',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/partners/partners.html',
        controller: 'PartnersCtrl'
      });
  });