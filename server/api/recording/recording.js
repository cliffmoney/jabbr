var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    RecordingModel = require('./recording.model'),
    Partnerships = require('../partnership/partnership.model'),
    conn = mongoose.connection,
    url = require("url"),
    path = require("path"),
    fs = require('fs'),
    Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;

//if two streams, write both streams to disk and save metadata to Recordings
//if one stream, write single stream to disk then calls saveToGridFS
var writeToDisk = function(recording){ // roomId is a prop of recording
  var rootPath = 'server/api/recording/uploads/';
  //if peer stream exists
  if (recording.peerAudio) {
    var filePath = rootPath + recording.fileName,
        peerFilePath = rootPath + recording.peerFileName,
        dataURL = recording.selfAudio.split(',').pop(),
        peerDataURL = recording.peerAudio.split(',').pop(),
        fileBuffer = new Buffer(dataURL, 'base64'),
        peerFileBuffer = new Buffer(peerDataURL, 'base64'),
        roomId = recording.roomId,
        creatorEmail = recording.userId;


    // TODO: given roomId and creatorEmail, find partnerEmail
    // query Partnerships with roomId
    var foo;
    Partnerships.find({room_id: roomId}, function(err, docs){
      if (err) {
        console.log(err);
      }
      else {
        console.log('docs: ');
        console.log(docs);
        // TODO: save metadata to Recordings collection; see mongoose docs
        RecordingModel.create({
          filename: recording.fileName,
          creator: docs[0].requester,
          partner: docs[0].recipient,
          date: new Date().valueOf()
        })
      }
    });
    console.log('foo: ');
    console.log(foo);


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
      // stream file to GridFS then deletes file from uploads folder
      // TODO: maybe bypass gridFS ??
      // saveToGridFS(recording.fileName, recording.userId);
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
    console.log('saved to gridfs by' + userId);
      //removes file from folder
      // fs.unlink(filePath,function(err){
      //   console.log(file.filename + ' saved To GridFS by ' + userId);
      // })
  });

};

//merge two files into one file and deletes original two files
var merge = function(socket, fileName, userId) {
    var ffmpeg = require('fluent-ffmpeg');

    var audioFile = path.join(__dirname, 'uploads', fileName + '.wav'),
        peerAudioFile = path.join(__dirname, 'uploads', fileName + '_1.wav'),
        mergedFile = path.join(__dirname, 'uploads', fileName + '-merged.wav');

    var command = ffmpeg(audioFile)
        .input(peerAudioFile)
        .inputOptions('-filter_complex amix=duration=shortest:dropout_transition=1')
        .on('error', function (err) {
            console.log(err.message);
        })
        .on('end', function () {
            socket.emit('merged', fileName + '-merged.wav');
            console.log('Merging finished !');
            // removing both audio files
            fs.unlink(audioFile);
            fs.unlink(peerAudioFile);
            // TODO: rename filename in Mongo metadata here!
            // RecordingModel.update({filename: fileName + '.wav'}, function(err, doc){
            //   if (err) {
            //     console.log(err);
            //   } else{
            //     doc.filename = fileName + '-merged.wav';
            //   }

            // });
              
            console.log(RecordingModel.findOne({filename: fileName + '.wav'}))
            RecordingModel.update({filename: fileName + '.wav'},
                                  { $set: { filename: fileName + '-merged.wav' }},
                                  function(err, docs){
                                    if (err){
                                      console.log(err)
                                    } else{
                                      console.log('docs: ');
                                      console.log(docs);
                                    }

                                  });

            //save to GridFS and delete file
            // saveToGridFS(fileName+'-merged.wav', userId);

        })
        .save(mergedFile);
};

module.exports = {
  writeToDisk: writeToDisk,
  merge: merge
}

