const
  express = require('express'),
  router = express.Router(),
  User = require('../../models/User'),
  usersCtrl = require('../../controllers/users'),
  tool = require('../../tools/tools')


  // Public Routes
  router.get('/', usersCtrl.index);
  router.get('/lobby', usersCtrl.index);
  router.post('/new', usersCtrl.create);
  router.get('/:id', usersCtrl.show);
  // router.get('/find/:lobbyName', usersCtrl.findByName); // finds lobby by name field
  router.delete('/:id', usersCtrl.delete);


  module.exports = router;
