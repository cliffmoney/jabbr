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
    pic: '',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    nativeLanguage: 'Arabic',
    languageLearning: 'English'
  }, {
    provider: 'local',
    pic: 'https://avatars2.githubusercontent.com/u/6611549',
    name: 'Angela',
    email: 'angela@gmail.com',
    password: '123',
    nativeLanguage: 'Chinese',
    languageLearning: 'Spanish'
  }, {
    provider: 'local',
    pic: 'https://avatars3.githubusercontent.com/u/1560627',
    name: 'Bill',
    email: 'bill@gmail.com',
    password: '123',
    nativeLanguage: 'English',
    languageLearning: 'Spanish'
  }, {
    provider: 'local',
    pic: 'https://avatars0.githubusercontent.com/u/9545110',
    name: 'Brandon',
    email: 'brandon@gmail.com',
    password: '123',
    nativeLanguage: 'English',
    languageLearning: 'Arabic'
  }, {
    provider: 'local',
    pic: 'https://avatars1.githubusercontent.com/u/10258460',
    name: 'Jeff',
    email: 'jeff@gmail.com',
    password: '123',
    nativeLanguage: 'Spanish',
    languageLearning: 'Chinese'
  }, {
    provider: 'local',
    pic: '',
    role: 'admin',
    name: 'The Jabbr Team',
    email: 'admin@jabbr.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Recording.find({}).remove(function() {
  Recording.create(
  {
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3",
    creator: "angela@gmail.com",
    partner: "jeff@gmail.com",
    date: new Date('May 16, 2015').valueOf()
  },
  {
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3",
    creator: "bill@gmail.com",
    partner: "brandon@gmail.com",
    date: new Date('May 15, 2015').valueOf()

  },
  {
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3",
    creator: "angela@gmail.com",
    partner: "bill@gmail.com",
    date: new Date('May 14, 2015').valueOf()
  },
  {
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/03+Age+Ain%27t+Nothing+But+A+Number.mp3",
    creator: "jeff@gmail.com",
    partner: "angela@gmail.com",
    date: new Date('May 13, 2015').valueOf()
  }, function() {
      console.log('finished populating recordings');
    }
  );
});