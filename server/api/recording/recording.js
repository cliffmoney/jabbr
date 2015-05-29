var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    conn = mongoose.connection,
    url = require("url"),
    path = require("path"),
    fs = require('fs'),
    Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;

module.exports = function(recording, cb){
    var fileExtension = recording.filename.split('.').pop(),
    fileRootNameWithBase = 'server/api/uploads/' + recording.filename,
    filePath = fileRootNameWithBase,
    fileID = 2,
    fileBuffer;

    var dataURL = recording.audio.split(',').pop();
    fileBuffer = new Buffer(dataURL, 'base64');
    fs.writeFile(filePath, fileBuffer, function(err){
      if (err) console.log(err);

      var gfs = Grid(conn.db);
      writestream = gfs.createWriteStream({
          filename: recording.filename,
          content_type: 'audio/wave',
          metadata: {
            userId: recording.userId
          }
      });
      fs.createReadStream(filePath).pipe(writestream);
      writestream.on('close', function (file) {
          // do something with `file`
          fs.unlink(filePath,function(err){
            console.log(file.filename + ' Written To DB');
            cb(recording.filename);
          })
      });
    });
};
