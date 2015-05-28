'use strict';

var express = require('express');
var controller = require('./recording.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/userRecordings', auth.isAuthenticated(), controller.getUserRecordings);
router.get('/oneRecording', auth.isAuthenticated(), controller.getOneRecording);

router.get('/', controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;