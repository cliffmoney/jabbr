'use strict';

angular.module('jabbrApp')
  .factory('VideoStream', function ($q) {
    var stream;
    var get = function(){
      if (stream) {
        return $q.when(stream);
      }
      else {
        var d = $q.defer();
        navigator.getUserMedia({
          video: true,
          audio: true
        },function (s) {
          stream = s;
          d.resolve(stream);
        }, function (e) {
          d.reject(e);
        });
        return d.promise;
      }
    }

    return {
      get: get
    };
  });
