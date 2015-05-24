'use strict';

angular.module('jabbrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('deck', {
        url: '/deck',
        parent: 'dashboard',
        templateUrl: 'app/dashboard/deck/deck.html',
        controller: 'DeckCtrl'
      });
  });