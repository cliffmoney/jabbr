'use strict';

var express = require('express');
var auth = require('../auth/auth.service');
var request = require('request');
var config = require('../config/local.env.js');

var router = express.Router();

var requestGoogle = function(req, res) {
  var baseUrl = 'https://www.googleapis.com/language/translate/v2?key='+config.TRANSLATE_API;
  var params = "&q=" + req.body.text + "&target=" + req.body.language;
  var options = {
    url: baseUrl + params,
    method: 'GET',
  };

  request(options, function(error, response){
    if (error) {
      console.log('Error getting translation from Google');
      return;
    }
    console.log(response.data.data);
    res.send(response.data.data);
  })
};

router.get('/', auth.isAuthenticated(), requestGoogle);


module.exports = router;