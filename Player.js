const
  mongoose = require('mongoose'),
  
  playerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    teamName: String,
    teamCity: String,
    position: String,
    active: Boolean
  });
  
  module.exports = mongoose.model('Player', playerSchema)
