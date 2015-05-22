'use strict';

describe('Controller: RecordingsCtrl', function () {

  // load the controller's module
  beforeEach(module('jabbrApp'));

  var RecordingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecordingsCtrl = $controller('RecordingsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
