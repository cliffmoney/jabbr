'use strict';

angular.module('jabbrApp')
  .factory('Audio', function ($http) {

//gets comments for that recording
  var get = function(filename) {
    return $http.get('/api/audioComments/'+filename)
    .success(function(data, status){
      return data;
    }).error(function(data, status) {
      console.log('Error getting comments');
    });
  };

//create a doc for recording or update existing recording
  var update = function(filename, comment) {
    $http.post('/api/audioComments', {
      filename: filename,
      comments: comment
    }).success(function(data, status){
      console.log('Comment saved');
    }).error(function(data, status) {
      console.log('Error updating comments');
    });
  };

//deletes doc from database
  var destroy = function(filename, comment) {
    $http.delete('/api/audioComments', {
      filename: filename,
      comments: comment
    }).success(function(data, status){
      console.log('File and all comments deleted!');
    }).error(function(data, status) {
      console.log('Error deleting audio comment doc');
    });
  };

//remove a single comment from the recording
  var remove = function(filename, commentId) {
    $http.put('/api/audioComments', {
      filename: filename,
      commentId: commentId
    }).success(function(data, status){
      console.log('Comment removed');
    }).error(function(data, status) {
      console.log('Error removing audio comment');
    });
  };
  return {
    update: update,
    get: get,
    destroy: destroy,
    remove: remove 
  };
  });