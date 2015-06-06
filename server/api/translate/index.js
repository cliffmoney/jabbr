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
    var body = JSON.parse(response.body);
    res.send(body.data.translations[0].translatedText);
  })
};

var languageList = function(req, res) {
  var baseUrl = 'https://www.googleapis.com/language/translate/v2/languages?&key='+config.TRANSLATE_API;
  var params = req.params.lang || 'en';
  var options = {
    url: baseUrl + "&target=" + params,
    method: 'GET',
  };
  request(options, function(error, response) {
    if (error) {
      console.log("Error getting list of supported languages");
      return;
    }
    res.send(response.body);
  })
};

router.post('/', auth.isAuthenticated(), requestGoogle);
router.get('/', auth.isAuthenticated(), languageList);
router.get('/:lang', auth.isAuthenticated(), languageList);

module.exports = router;