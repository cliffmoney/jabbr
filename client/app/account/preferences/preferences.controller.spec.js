'use strict';

describe('Controller: PreferencesCtrl', function () {

  // load the controller's module
  beforeEach(module('jabbrApp'));

  var PreferencesCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectPUT('api/users/preferences').respond(function(method, url, data, headers) {
      var validPreference = {
        'native': 'English',
        'learning': 'Spanish'
      };
      if ( data !== JSON.stringify(validPreference)) {
        return [400, ''];
      } else {
        return [200, ''];
      }
    });
    scope = $rootScope.$new();
    PreferencesCtrl = $controller('PreferencesCtrl', {
      $scope: scope
    });
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should send a language preference update to the server', function () {
    scope.user.native = 'English';
    scope.user.learning = 'Spanish';
    scope.submit();
    expect(scope.status).toBe('saving...');
    $httpBackend.flush();
    expect(scope.status).toBe('saved');
  });
});
