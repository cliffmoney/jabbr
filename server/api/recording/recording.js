var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    conn = mongoose.connection,
    url = require("url"),
    path = require("path"),
    fs = require('fs'),
    Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;

var writeToDisk = function(recording, cb){
    var fileExtension = recording.filename.split('.').pop(),
    fileRootNameWithBase = 'server/api/recording/uploads/' + recording.filename,
    filePath = fileRootNameWithBase,
    fileID = 2,
    fileBuffer;

    var dataURL = recording.audio.split(',').pop();
    fileBuffer = new Buffer(dataURL, 'base64');
    fs.writeFile(filePath, fileBuffer, function(err){
      if (err) console.log(err);
      
      saveToGridFS(recording, filePath, cb);
    });
};

var saveToGridFS = function(recording, filePath, cb) {
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
      // fs.unlink(filePath,function(err){
        console.log(file.filename + ' Written To UPLOADS by ' + recording.userId);
        cb(recording.filename);
      // })
  });

};

var merge = function(socket, fileName) {
    var FFmpeg = require('fluent-ffmpeg');

    var audioFile = path.join(__dirname, 'uploads', fileName + '.wav'),
        peerAudioFile = path.join(__dirname, 'uploads', fileName + '(1).wav'),
        mergedFile = path.join(__dirname, 'uploads', fileName + '-merged.wav');

    new FFmpeg({
            source: audioFile
        })
        .addInput(peerAudioFile)
        .on('error', function (err) {
            console.log(err);
        })
        .on('end', function () {
            socket.emit('merged', fileName + '-merged.webm');
            console.log('Merging finished !');

            // removing audio/video files
            fs.unlink(audioFile);
            fs.unlink(peerAudioFile);
        })
        .saveToFile(mergedFile);
};

module.exports = {
  writeToDisk: writeToDisk,
  merge: merge
};

