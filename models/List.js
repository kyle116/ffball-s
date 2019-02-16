const
  mongoose = require('mongoose'),

  listSchema = new mongoose.Schema({
    players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}]
  });

  module.exports = mongoose.model('List', listSchema);
