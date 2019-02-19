const
  mongoose = require('mongoose'),

  teamSchema = new mongoose.Schema({
    players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
    lobby: {type: mongoose.Schema.Types.ObjectId, ref: 'Lobby'}
  });

module.exports = mongoose.model('Team', teamSchema);
