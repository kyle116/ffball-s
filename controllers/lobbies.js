const Lobby = require('../models/Lobby');
const jwt = require('jsonwebtoken');

class LobbyController {
  home(req, res) {
    res.json({message: 'Root Route'});
  }

  index(req, res) {
    Lobby.find({}, (err, lobbies) => {
      res.json(lobbies);
    });
  }

  create(req, res) {
    Lobby.create(req.body, (err, lobby) =>{
      if (err) return res.status(500).send(err.message);
      const response = {
        message: 'Lobby Created',
        success: true,
        lobby: lobby
      };
      res.status(200).json(response);
    });
  }

  findLobbyById(req, res) {
    Lobby.findById(req.params.lobbyId, (err, lobby) => {
      res.json(lobby);
    });
  }

  findLobbyByName(req, res) {
    Lobby.find({name: decodeURI(req.params.lobbyName)}, (err, lobby) => {
      // if (lobby.length === 0) return res.status(500).json('No lobbies found');
      res.json(lobby);
    });
  }

  delete(req, res) {
    Lobby.findByIdAndRemove(req.params.id, (err, deletedLobby) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: 'Lobby successfully deleted',
        id: req.params.id,
        deletedLobby: deletedLobby
      };
      return res.status(200).json(response);
    });
  }
}

module.exports = new LobbyController();
