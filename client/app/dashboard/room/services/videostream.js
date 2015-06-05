'use strict';
angular.module('jabbrApp')
  .factory('VideoStream', function(){
    console.log("VideoStream Digest")
    var videoStream = {};
    EventEmitter.call(videoStream);
    Object.setPrototypeOf(videoStream, EventEmitter.prototype);
    videoStream.userMedia = undefined;
    videoStream.get = function(){
      navigator.getUserMedia({
      video: true,
      audio: true
      },
      function(userMedia){
        videoStream.userMedia = userMedia;
        videoStream.emit("streamReady", userMedia)
      },
      function(err){
        videoStream.get()
        console.log("There was an error loading stream")
        console.log("FIXING WITH RECURSIVE SUPER POWER")
      });
    };
      return videoStream;
  });
