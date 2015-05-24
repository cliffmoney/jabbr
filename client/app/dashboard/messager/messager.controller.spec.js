'use strict';

describe('Controller: MessagerCtrl', function () {

  // load the controller's module
  beforeEach(module('jabbrApp'));

  var MessagerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MessagerCtrl = $controller('MessagerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
