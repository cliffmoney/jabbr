angular.module('jabbrApp')
  .controller('LeftPanelCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Home',
        'state': 'overview'
      }, {
        'title': 'My Saved Recordings',
        'state': 'recordings'
      }, {
        'title': 'My Practice Deck',
        'state': 'deck'
      }, {
        'title': 'My Partners',
        'state': 'partners'
      }, {
        'title': 'My Messages',
        'state': 'inbox'
      }, {
        'title': 'My Profile',
        'state': 'profile'
      }, {
        'title': 'My Preferences',
        'state': 'preferences'
      }
    ];

  });