angular.module('jabbrApp')
  .controller('LeftPanelCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/dashboard'
      }, {
        'title': 'My Saved Recordings',
        'link': '/recordings'
      }, {
        'title': 'My Practice Deck',
        'link': '/deck'
      }, {
        'title': 'My Partners',
        'link': '/partners'
      }, {
        'title': 'My Messages',
        'link': '/inbox'
      }, {
        'title': 'My Profile',
        'link': '/profile'
      }, {
        'title': 'My Preferences',
        'link': '/preferences'
      }
    ];

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });