'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('recordings', {
        url: '/recordings',
        templateUrl: 'app/recordings/recordings.html',
        controller: 'RecordingsCtrl'
      });
  });