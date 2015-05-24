angular.module('jabbrApp')
  .controller('LeftPanelCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/dashboard'
      }, {
        'title': 'My Saved Recordings',
        'link': 'dashboard/recordings'
      }, {
        'title': 'My Practice Deck',
        'link': 'dashboard/deck'
      }, {
        'title': 'My Partners',
        'link': 'dashboard/partners'
      }, {
        'title': 'My Messages',
        'link': 'dashboard/inbox'
      }, {
        'title': 'My Profile',
        'link': 'dashboard/profile'
      }, {
        'title': 'My Preferences',
        'link': 'dashboard/preferences'
      }
    ];

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });