angular.module('jabbrApp')
  .controller('LeftPanelCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Home',
        'state': 'overview'
      }, {
        'title': 'Saved Recordings',
        'state': 'recordings'
      }, {
        'title': 'Practice Deck',
        'state': 'deck'
      }, {
        'title': 'Partners',
        'state': 'partners'
      }, {
        'title': 'Messages',
        'state': 'inbox'
      }, {
        'title': 'Profile',
        'state': 'myprofile'
      }, {
        'title': 'Preferences',
        'state': 'preferences'
      }
    ];

  });