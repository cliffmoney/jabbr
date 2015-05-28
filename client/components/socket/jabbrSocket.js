angular.module('jabbrApp')
  .factory('JabbrSocket', function() {
     var socket = io.connect('http://localhost:9000');
     socket.on('firstContact', function(){
        console.log('Socket Connection Successful');
        startRecording= false;
     });
     return socket;
});