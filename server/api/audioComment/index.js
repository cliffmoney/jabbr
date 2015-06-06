'use strict';

var express = require('express');
var controller = require('./audioComment.controller');

var router = express.Router();

router.get('/:id', controller.show);
router.post('/', controller.upsert);
router.put('/', controller.remove);
router.delete('/', controller.destroy);

module.exports = router;