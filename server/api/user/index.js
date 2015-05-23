'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/preferences', auth.isAuthenticated(), controller.changeUserPreferences);
router.get('/suggestedPartners', auth.isAuthenticated(), controller.getSuggestedPartners);
router.get('/userRecordings', auth.isAuthenticated(), controller.getUserRecordings);
router.post('/invitations', auth.isAuthenticated(), controller.createInvite);
router.get('/invitations', auth.isAuthenticated(), controller.getInvites);
router.put('/invitations', auth.isAuthenticated(), controller.updateInvite);
router.get('/meetups', auth.isAuthenticated(), controller.getMeetups);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
