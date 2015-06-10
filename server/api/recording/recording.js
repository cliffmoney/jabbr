var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    RecordingModel = require('./recording.model'),
    conn = mongoose.connection,
    url = require("url"),
    path = require("path"),
    fs = require('fs'),
    uuid = require('node-uuid'),
    Grid = require('gridfs-stream');

var singles = {};
Grid.mongo = mongoose.mongo;

var writeToDisk = function(recording){ // roomId is a prop of recording
  var filename = recording.roomId;
  var rootPath = 'server/api/recording/uploads/';
  var filePath = rootPath + filename,
      dataURL = recording.dataURL.split(',').pop(),
      fileBuffer = new Buffer(dataURL, 'base64');
  if (singles[filename]) {
    var otherHalf = filePath + "_1.wav";
    fs.writeFile(otherHalf, fileBuffer, function() {
      var userEmails = [];
      userEmails.push(singles[filename], recording.user.email);
      merge(filename, userEmails);
      delete singles[filename]; 
    })
  } else {
    singles[filename] = recording.user.email;
    fs.writeFile(filePath + ".wav", fileBuffer, function() {
    });
  }  
};

//stream file to GridFS then deletes file from uploads folder
// var saveToGridFS = function(filename, userId) {
//   var filePath = 'server/api/recording/uploads/' + filename;
//   var gfs = Grid(conn.db);
//   writestream = gfs.createWriteStream({
//       filename: filename,
//       content_type: 'audio/wave',
//       metadata: {
//         userId: userId
//       }
//   });
//   fs.createReadStream(filePath).pipe(writestream);
//   writestream.on('close', function (file) {
//       //removes file from folder
//       fs.unlink(filePath,function(err){
//         console.log(file.filename + ' saved To GridFS by ' + userId);
//       })
//   });
// };

//merge two files into one file and deletes original two files
var merge = function(fileName, userEmails) {
  var ffmpeg = require('fluent-ffmpeg');

  var finalName = uuid.v4();
      audioFile = path.join(__dirname, 'uploads', fileName + '.wav'),
      peerAudioFile = path.join(__dirname, 'uploads', fileName + '_1.wav'),
      mergedFile = path.join(__dirname, 'uploads', finalName + '-merged.wav'),
      placeholder = path.join(__dirname, 'uploads/uploadsfoldertest.mp3');

  var command = ffmpeg(peerAudioFile)
    .input(audioFile)
    .input(placeholder)
    .inputOptions('-filter_complex amix=duration=shortest:dropout_transition=1')
    .on('start', function(commandline) {
      //console.log('Spawned ffmpeg with command: ' + commandline);
    })
    .on('error', function (err) {
      console.log(err.message);
    })
    .on('end', function () {
      console.log('Merging finished !');
      // removing both audio files
      fs.unlink(audioFile);
      fs.unlink(peerAudioFile);
      RecordingModel.create({
        filename: finalName + '-merged.wav',
        creator: userEmails[0],
        partner: userEmails[1],
        date: new Date().valueOf()
        }, function (err, recording) {
          if (err) {console.log (err);}
        });
      RecordingModel.create({
        filename: finalName + '-merged.wav',
        creator: userEmails[1],
        partner: userEmails[0],
        date: new Date().valueOf()
        }, function (err, recording) {
          if (err) {console.log (err);}
        });
    })
    .save(mergedFile);
};

module.exports = {
  writeToDisk: writeToDisk,
}

