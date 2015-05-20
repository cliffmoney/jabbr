'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('preferences', {
        url: '/preferences',
        templateUrl: 'app/account/preferences/preferences.html',
        controller: 'PreferencesCtrl'
      });
  });