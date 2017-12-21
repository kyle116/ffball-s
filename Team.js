const
  moongoose = require('mongoose'),
  
  teamSchema = new mongoose.Schema({
    players: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}]
  });
  
  module.exports = mongoose.model('Team', teamSchema);
