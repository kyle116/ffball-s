const mongoose = require('mongoose');

var lobbySchema = new mongoose.Schema(
	{
		name: { type: String, unique: true, required: true },
		list: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
		teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
	},
  {
    autoIndex: true,
    timestamps: true
  }
);

module.exports = mongoose.model('Lobby', lobbySchema);
