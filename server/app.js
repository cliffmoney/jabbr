//  ENTRY TO THE APPLICATION //
'use strict';
// Set default node environment to development
	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Set default node environment to development
	process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// DECLARE GLOBAL VARIABLES AND ESTABLISH SERVER
	var express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	socketio = require('socket.io'),
	config = require('./config/environment');

// Express middleware
	require('./config/express')(app);

// Express Routes
	require('./routes')(app);

// Connect to database
	mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
	if(config.seedDB) { require('./config/seed'); }

// Socket IO
	var socketio = require('socket.io')(server, {
	  serveClient: (config.env === 'production') ? false : true,
	  path: '/socket.io-client'
	});
	require('./config/socketio')(socketio);

// Start server
	server.listen(config.port, config.ip, function () {
	  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
	});

// Expose app
	exports = module.exports = app;