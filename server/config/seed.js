/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Recording = require('../api/recording/recording.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    nativeLanguage: 'Arabic',
    languageLearning: 'English'
  }, {
    provider: 'local',
    name: 'Angela',
    email: 'angela@gmail.com',
    password: '123',
    nativeLanguage: 'Chinese',
    languageLearning: 'Spanish'
  }, {
    provider: 'local',
    name: 'Bill',
    email: 'bill@gmail.com',
    password: '123',
    nativeLanguage: 'English',
    languageLearning: 'Spanish'
  }, {
    provider: 'local',
    name: 'Brandon',
    email: 'brandon@gmail.com',
    password: '123',
    nativeLanguage: 'English',
    languageLearning: 'Arabic'
  }, {
    provider: 'local',
    name: 'Jeff',
    email: 'jeff@gmail.com',
    password: '123',
    nativeLanguage: 'Spanish',
    languageLearning: 'Chinese'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
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