//  ENTRY TO THE APPLICATION //
'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config/environment');

// Set default node environment to development

// Express Server Setup
	var express = require('express');
	var app = express();
	var server = require('http').Server(app);
	require('./config/express')(app);
	require('./routes')(app);

// Socket IO Setup
	var socketio = require('socket.io')(server)
	require('./config/socketio')(socketio);

// Database Setup
	var mongoose = require('mongoose');
	mongoose.set('debug', true);
	mongoose.connect(config.mongo.uri, config.mongo.options);
	if(config.seedDB) { require('./config/seed'); }

// Start server
	server.listen(config.port, function () {
	  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
	});

// Expose app
	exports = module.exports = app;