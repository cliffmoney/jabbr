var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    conn = mongoose.connection,
    url = require("url"),
    path = require("path"),
    fs = require('fs'),
    Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;


    module.exports = function(username, cb){
      var gfs = Grid(conn.db);
      var readStream = gfs.createReadStream({
         filename:"925cd4fb-729d-4b7c-bae7-c2175a1e33f1.wav"
      });
      cb(readStream);
    }
