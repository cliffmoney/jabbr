'use strict';

describe('Controller: InboxCtrl', function () {

  // load the controller's module
  beforeEach(module('jabbrApp'));

  var InboxCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InboxCtrl = $controller('InboxCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
