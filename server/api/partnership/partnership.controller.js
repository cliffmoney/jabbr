'use strict';

var _ = require('lodash');
var Partnership = require('./partnership.model');
var Message = require('../message/message.model');
var User = require('../user/user.model');
var mongoose = require('mongoose');
var uuid = require('node-uuid');


// Get list of partnerships that belong to user and have a room
exports.index = function(req, res) {
  var userId = mongoose.Types.ObjectId(req.user._id);
  Partnership.find( {$and:[ {confirmed: true}, {$or:[ {'recipient':userId}, {'requester':userId}]}]})
    .populate('recipient requester')
    .exec(function(err, partnerships) {
      if(err) { return handleError(res, err); }
      return res.json(200, partnerships);
    });
};


// Get a single partnership. Adds a property called partner to the response object for a logged in user
exports.show = function(req, res) {
  var userId = mongoose.Types.ObjectId(req.user._id);
  Partnership.findById(req.params.id)
    .populate('messages')
    .exec(function(err, partnership) {
      if(err) { return handleError(res, err); }
      if(!partnership) { return res.send(404); }
      if (partnership.recipient.equals(userId)) { // check which partner info to set on return object
        User.findById(partnership.requester, 
          'name nativeLanguages languagesSpeaking languagesLearning pic country',
          function(err, user) {
            if(err) { return handleError(res, err); }
            var partnershipJson = partnership.toObject(); // convert to regular json object to add partner prop
            partnershipJson.partner = user;
            res.json(partnershipJson);  // send back regular json
        });
      } else {
        User.findById(partnership.recipient, 
          'name nativeLanguages languagesSpeaking languagesLearning pic country',
          function(err, user) {
            if(err) { return handleError(res, err); }
            var partnershipJson = partnership.toObject();
            partnershipJson.partner = user;
            res.json(partnershipJson);
        });
      }
    });
};

// Creates a new partnership in the DB.
exports.create = function(req, res) {
  // first convert strings into mongoose Object id's
  var fromId = mongoose.Types.ObjectId(req.body.requester);
  var toId = mongoose.Types.ObjectId(req.body.recipient);
  // first create a new message that gets sent to request recipient
  Message.create({
    from: fromId,
    to: toId,
    type: 'partnerRequest',
    body: req.body.body
  }, function(err, message) {
    if(err) { return handleError(res, err); }
    // now create the partnership
    Partnership.create({
        requester: fromId,
        recipient: toId,
        messages: [message._id]
      }, function(err, partnership) {
        if(err) { return handleError(res, err); }
        // now update the message to reference the partnership
        message._partnership = partnership._id;
        message.save(function (err) {
          if (err) return handleError(err);
          // now push the corresponding user id to the appropriate waiting array of each user
          User.findByIdAndUpdate(partnership.requester,
            {$push : {waitingOn: partnership.recipient}},
            {safe: true},
            function(err, user) {
              if(err) { handleError(res, err); }
              User.findByIdAndUpdate(partnership.recipient,
                {$push : {notRespondedTo: partnership.requester }},
                {safe: true},
                function(err, user) {
                  if(err) { handleError(res, err); }
                  return res.json(201, partnership);
              });
          });
        });
      });
    });
};

// Updates an existing partnership in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Partnership.findById(req.params.id, function (err, partnership) {
    if (err) { return handleError(res, err); }
    if(!partnership) { return res.send(404); }
    if(partnership.confirmed === false) {
      partnership.confirmed = true;
      partnership.room_id = uuid.v4();
      partnership.save(function (err) {
        if (err) { return handleError(res, err); }
        console.log('created room');
        return res.json(200, partnership);
      });
    } else {
      console.log('room not created again');
      return res.json(404);
    }
  });
};

// confirms a pending partnership
exports.confirm = function(req, res) {
  Partnership.findById(req.params.id, function (err, partnership) {
    if (err) { return handleError(res, err); }
    if(!partnership) { return res.send(404); }
    // only confirm if unconfirmed 
    if(!partnership.confirmed) {
      partnership.confirmed = true;
      partnership.room_id = uuid.v4();
      partnership.save(function (err, partnership) {
        if (err) { return handleError(res, err); }
        partnership.sendConfirmation(); // sends a confirmation message to the requester
        // save reciprocal partner ids and partnership ids to both user documents
        User.findByIdAndUpdate(partnership.requester,
          {$push : {partners: partnership.recipient, partnerships: partnership._id},
           $pull : {waitingOn: partnership.recipient }},
          {safe: true},
          function(err, user) {
            User.findByIdAndUpdate(partnership.recipient,
              {$push : {partners: partnership.requester, partnerships: partnership._id},
               $pull : {notRespondedTo: partnership.requester}},
              {safe: true},
              function(err, user) {
                return res.json(200, partnership);
              });
          });
      });
    } else {
      // a forbidden status code tells client not to try this again. partnership is already confirmed
      return res.json(403);
    }
  });
}

// Deletes a partnership from the DB.
exports.destroy = function(req, res) {
  Partnership.findById(req.params.id, function (err, partnership) {
    if(err) { return handleError(res, err); }
    if(!partnership) { return res.send(404); }
    partnership.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}