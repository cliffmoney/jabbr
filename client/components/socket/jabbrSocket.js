angular.module('jabbrApp')
  .factory('JabbrSocket', function() {
     var socket = io.connect('http://deus.io:9000');
     socket.on('firstContact', function(){
        console.log('Socket Connection Successful');
     });
     return socket;
});