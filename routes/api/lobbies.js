var express = require('express');
var router = express.Router();
var Lobby = require('../../models/Lobby');
var lobbiesCtrl = require('../../controllers/lobbies');

// Public Routes
router.get('/', lobbiesCtrl.index);
router.get('/lobby', lobbiesCtrl.index);
router.post('/new', lobbiesCtrl.create);
router.get('/:id', lobbiesCtrl.show);
router.delete('/:id', lobbiesCtrl.delete);


module.exports = router;
