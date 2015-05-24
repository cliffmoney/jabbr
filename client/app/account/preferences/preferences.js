'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('preferences', {
        url: '/preferences',
        parent: 'dashboard',
        templateUrl: 'app/account/preferences/preferences.html',
        controller: 'PreferencesCtrl'
      });
  });