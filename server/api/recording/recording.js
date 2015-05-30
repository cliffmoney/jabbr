var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    conn = mongoose.connection,
    url = require("url"),
    path = require("path"),
    fs = require('fs'),
    Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;

//if two streams, write both streams to disk
//if one stream, write single stream to disk then calls saveToGridFS
var writeToDisk = function(recording){
  var rootPath = 'server/api/recording/uploads/';
  //if peer stream exists
  if (recording.peerAudio) {
    var filePath = rootPath + recording.fileName,
        peerFilePath = rootPath + recording.peerFileName,
        dataURL = recording.selfAudio.split(',').pop(),
        peerDataURL = recording.peerAudio.split(',').pop(),
        fileBuffer = new Buffer(dataURL, 'base64'),
        peerFileBuffer = new Buffer(peerDataURL, 'base64');
    //write self stream to uploads folder
    fs.writeFile(filePath, fileBuffer, function() {
      //write peer stream to uploads folder
      fs.writeFile(peerFilePath, peerFileBuffer, function() {
        //nothing to do here
      })
    });

  } else {
    var filePath = rootPath + recording.fileName,
        dataURL = recording.selfAudio.split(',').pop(),
        fileBuffer = new Buffer(dataURL, 'base64');
    //write self stream to uploads folder
    fs.writeFile(filePath, fileBuffer, function() {
      //stream file to GridFS then deletes file from uploads folder
      saveToGridFS(recording.fileName, recording.userId);
    });
  }

};

//stream file to GridFS then deletes file from uploads folder
var saveToGridFS = function(filename, userId) {
  var filePath = 'server/api/recording/uploads/' + filename;
  var gfs = Grid(conn.db);
  writestream = gfs.createWriteStream({
      filename: filename,
      content_type: 'audio/wave',
      metadata: {
        userId: userId
      }
  });
  fs.createReadStream(filePath).pipe(writestream);
  writestream.on('close', function (file) {
      //removes file from folder
      fs.unlink(filePath,function(err){
        console.log(file.filename + ' saved To GridFS by ' + userId);
      })
  });

};

//merge two files into one file and deletes original two files
var merge = function(socket, fileName, userId) {
    var FFmpeg = require('fluent-ffmpeg');

    var audioFile = path.join(__dirname, 'uploads', fileName + '.wav'),
        peerAudioFile = path.join(__dirname, 'uploads', fileName + '(1).wav'),
        mergedFile = path.join(__dirname, 'uploads', fileName + '-merged.wav');

    var command = new FFmpeg({
            source: audioFile
        })
        .addInput(peerAudioFile)
        .on('error', function (err) {
            console.log(err);
        })
        .on('end', function () {
            socket.emit('merged', fileName + '-merged.wav');
            console.log('Merging finished !');
            // removing both audio files
            fs.unlink(audioFile);
            fs.unlink(peerAudioFile);
            //save to GridFS and delete file
            saveToGridFS(fileName+'-merged.wav', userId);

        })
        .save(mergedFile);
};

module.exports = {
  writeToDisk: writeToDisk,
  merge: merge
}

