const
  moongoose = require('mongoose'),
  
  lobbySchema = new mongoose.Schema({
    list: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
  });
  
  module.exports = mongoose.model('Lobby', lobbySchema);
