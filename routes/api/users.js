const
  express = require('express'),
  router = express.Router(),
  User = require('../../models/User'),
  usersCtrl = require('../../controllers/users'),
  tools = require('../../tools/tools')


  // Public Routes
  router.get('/', usersCtrl.index);
  // router.get('/lobby', usersCtrl.index);
  router.post('/new', usersCtrl.create);
  router.post('/login', usersCtrl.login);

  // Private Routes: User Auth Required
  router.get('/edit/:id', tools.isLoggedIn, usersCtrl.edit);
  router.get('/:id', tools.isLoggedIn, usersCtrl.show);
  router.delete('/:id', tools.isLoggedIn, usersCtrl.delete);


  module.exports = router;
