const
  express = require('express'),
  router = express.Router(),
  Lobby = require('../../models/Lobby'),
  lobbiesCtrl = require('../../controllers/lobbies'),
  tool = require('../../tools/tools')


// Public Routes
router.get('/', lobbiesCtrl.index);
router.get('/lobby', lobbiesCtrl.index);
router.post('/new', lobbiesCtrl.create);
router.get('/:id', lobbiesCtrl.show);
router.get('/find/:lobbyName', lobbiesCtrl.findByName); // finds lobby by name field
router.delete('/:id', lobbiesCtrl.delete);


module.exports = router;
