/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Recording = require('../api/recording/recording.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    nativeLanguages: ['Arabic'],
    languagesLearning: [{language: 'English', ability: 2}, {language: 'Spanish', ability: 3}],
    languagesSpeaking: [{language: 'Arabic', ability: 5} ],
    intro: 'I spent one year in my youth in Des Moines, Iowa. It was best year of my life but I forget much English. I want to practice my English with people so I can speak better when I return to the states.',
    country: 'Lebanon'
  }, {
    provider: 'local',
    pic: 'https://avatars2.githubusercontent.com/u/6611549',
    name: 'Angela',
    email: 'angela@gmail.com',
    password: '123',
    nativeLanguages: ['Chinese'],
    languagesLearning: [{language: 'Spanish', ability: 2}, {language: 'Arabic', ability: 1}],
    languagesSpeaking: [{language: 'Chinese', ability: 5}],
    intro: 'I just took a trip to Barcelona with my husband and realized the Spanish I learned in high school just wasn\'t good enough. I\'d love to learn more!',
    country: 'China'
  }, {
    provider: 'local',
    pic: 'https://avatars3.githubusercontent.com/u/1560627',
    name: 'Bill',
    email: 'bill@gmail.com',
    password: '123',
    nativeLanguages: ['English'],
    languagesLearning: [{language: 'Spanish', ability: 2}, {language: 'Chinese', ability: 2}],
    languagesSpeaking: [{language: 'English', ability: 5}],
    intro: 'I just accepted a job in Guadalajara working for a software company. But I know almost no Spanish. I can teach American English to anyone who wants to learn',
    country: 'USA'
  }, {
    provider: 'local',
    pic: 'https://avatars0.githubusercontent.com/u/9545110',
    name: 'Brandon',
    email: 'brandon@gmail.com',
    password: '123',
    nativeLanguages: ['English'],
    languagesLearning: [{language: 'Arabic', ability: 3}, {language: 'Chinese', ability: 3}],
    languagesSpeaking: [{language: 'English', ability: 5}],
    intro: 'I spent one year in Egypt in 2010 and learned how to speak Egyptian Arabic. But I love the language and want to learn more dialects and more phrases.',
    country: 'USA'
  }, {
    provider: 'local',
    pic: 'https://avatars1.githubusercontent.com/u/10258460',
    name: 'Jeff',
    email: 'jeff@gmail.com',
    password: '123',
    nativeLanguages: ['Spanish'],
    languagesLearning: [{language: 'Chinese', ability: 2}, {language: 'English', ability: 2}],
    languagesSpeaking: [{language: 'Spanish', ability: 5}],
    intro: 'I\'ve always thought the Chinese character system was super cool, and I\'ve learned how to write basic Chinese. But now I want to learn some everyday spoken Chinese.',
    country: 'Peru'
  }, {
    provider: 'local',
    pic: '',
    role: 'admin',
    name: 'The Jabbr Team',
    email: 'admin@jabbr.com',
    password: 'admin'
  }, function() {
       console.log('finished populating users');
      // User.findOne({email: 'angela@gmail.com'}, function(err, user1){
      //   User.findOne({email: 'jeff@gmail.com'}, function(err, user2){
      //     Recording.create(
      //       {
      //         filename: "04+One+In+A+Million.mp3",
      //         creator: user1._id,
      //         partner: user2._id,
      //         date: new Date('May 26, 2015').valueOf()
      //       }
      //     );
      //   });
      // });
      // User.findOne({email: 'bill@gmail.com'}, function(err, user1){
      //   User.findOne({email: 'brandon@gmail.com'}, function(err, user2){
      //     Recording.create(
      //       {
      //         filename: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3",
      //         creator: user1._id,
      //         partner: user2._id,
      //         date: new Date('May 16, 2015').valueOf()
      //       }
      //     );
      //   });
      // });
      // User.findOne({email: 'angela@gmail.com'}, function(err, user1){
      //   User.findOne({email: 'bill@gmail.com'}, function(err, user2){
      //     Recording.create(
      //       {
      //         filename: "uploadsfoldertest.mp3",
      //         creator: user1._id,
      //         partner: user2._id,
      //         date: new Date('May 28, 2015').valueOf()
      //       }
      //     );
      //   });
      // });
      // User.findOne({email: 'jeff@gmail.com'}, function(err, user1){
      //   User.findOne({email: 'angela@gmail.com'}, function(err, user2){
      //     Recording.create(
      //       {
      //         filename: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3",
      //         creator: user1._id,
      //         partner: user2._id,
      //         date: new Date('May 16, 2015').valueOf()
      //       }
      //     );
      //   });
      // });
      // User.findOne({email: 'jeff@gmail.com'}, function(err, user1){
      //   User.findOne({email: 'angela@gmail.com'}, function(err, user2){
      //     Recording.create(
      //       {
      //         filename: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3",
      //         creator: user2._id,
      //         partner: user1._id,
      //         date: new Date('May 16, 2015').valueOf()
      //       }
      //     );
      //   });
      // });
    }
  );
});


