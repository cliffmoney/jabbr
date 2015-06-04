'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var request = require('request');
var config = require('../../config/local.env.js');

var router = express.Router();

var requestGoogle = function(req, res) {
  var baseUrl = 'https://www.googleapis.com/language/translate/v2?&key='+config.TRANSLATE_API;
  var params = "&q=" + req.body.text + "&target="+ req.body.targetLanguage;
  var options = {
    url: baseUrl + params,
    method: 'GET',
  };
  request(options, function(error, response){
    if (error) {
      console.log('Error getting translation from Google');
      return;
    }
    console.log(response.body);
    var body = JSON.parse(response.body);
    console.log(body.data.translations[0].translatedText);
    res.send(body.data.translations[0].translatedText);
  })
};

router.post('/', auth.isAuthenticated(), requestGoogle);


module.exports = router;