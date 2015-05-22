'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('jabbrApp'));

  var DashboardCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/users/suggestedPartners')
      .respond({partners: [{name:'Ben', native: 'English'}]});
    scope = $rootScope.$new();
    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));

  it('should fetch a list of suggested language partners', function () {
    $httpBackend.whenGET('/api/users/suggestedPartners')
      .respond({partners: [{name:'Ben', native: 'English'}]});
    scope.getSuggestedPartners();
    $httpBackend.flush();
    expect(JSON.stringify(scope.suggestedPartners))
      .toBe(JSON.stringify([{name:'Ben', native: 'English'}]));
  });
});
