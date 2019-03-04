const
  mongoose = require('mongoose'),

  listSchema = new mongoose.Schema({
    // players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
    players: {type: Array , 'default': []},
    lobby: {type: mongoose.Schema.Types.ObjectId, ref: 'Lobby'}
  });

module.exports = mongoose.model('List', listSchema);
