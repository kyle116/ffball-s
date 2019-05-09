const Lobby = require('../models/Lobby');
const List = require('../models/List');
const Team = require('../models/Team');
const Player = require('../models/Player');
const jwt = require('jsonwebtoken');

class LobbyController {
	constructor() {
		// this.getPlayers = this.getPlayers.bind(this);
		this.createList = this.createList.bind(this);
		this.createLobby = this.createLobby.bind(this);
	}

	async getPlayers(req, res) {
		try {
			var allPlayers = await Player.find({});
		} catch(err) {
			console.log(err.message);
			return err.message;
		}
		for (var i = 0; i < allPlayers.length; i++) {
			allPlayers[i] = allPlayers[i].toObject();
		}
		return allPlayers;
	}

	async createList(req, res) {
		try {
			var allPlayers = await this.getPlayers();
			var createdList = await List.create({});
		} catch(err) {
			console.log(err.message);
			return err.message;
		}
		createdList.players = allPlayers;
		createdList.save();
		return createdList;
	}

	async createLobby(req, res) {
		try {
			var createdList = await this.createList();
			var createdLobby = await Lobby.create(req.body);
		} catch(err) {
			console.log(err);
			return res.status(500).send(err.message);
		}
		createdLobby.list = createdList;
		createdLobby.save();
		const response = {
			message: 'Lobby Created',
			success: true,
			lobby: createdLobby
		};
		res.status(200).json(response);
	}

	home(req, res) {
		res.json({message: 'Root Route'});
	}

	index(req, res) {
		Lobby.find({}, (err, lobbies) => {
			res.json(lobbies);
		});
	}

	async findLobbyById(req, res) {
		try {
			var currentLobby = await Lobby.findById(req.get('currentUserId'));
		} catch(err) {
			console.log(err);
			return res.status(500).send(err.message);
		}
		var currentUserJoined = false;
		var currentUserTeam = null;
		var currentLobbyTeamsExcludeUser = [];
		Lobby.findById(req.params.lobbyId).populate('list').populate('teams').exec((err, lobby) => {
			for (var i = 0; i < lobby.teams.length; i++) {
				if(lobby.teams[i].user.equals(req.get('currentUserId'))) {
					currentUserJoined = true;
					currentUserTeam = lobby.teams[i];
				} else {
					currentLobbyTeamsExcludeUser.push(lobby.teams[i]);
				}
			}
			const response = {
				message: 'Lobby Found',
				success: true,
				lobby: lobby,
				currentUserJoined: currentUserJoined,
				currentUserTeam: currentUserTeam,
				currentLobbyTeamsExcludeUser: currentLobbyTeamsExcludeUser
			};
			res.status(200).json(response);
		});
	}

	findLobbyByName(req, res) {
		Lobby.find({name: decodeURI(req.params.lobbyName)}, (err, lobby) => {
			// if (lobby.length === 0) return res.status(500).json('No lobbies found');
			res.json(lobby);
		});
	}

	async joinLobby(req, res) {
		try {
			var currentLobby = await Lobby.findById(req.params.lobbyId).populate('teams');
			var currentUserTeam = await Team.create({lobby: req.body.lobby, user: req.body.user});			
		} catch(err) {
			console.log(err);
			return res.status(500).send(err.message);
		}
		var currentLobbyTeamsExcludeUser = [...currentLobby.teams];
		var currentLobbyTeams = currentLobby.teams;
		currentLobbyTeams.push(currentUserTeam);
		currentLobby.save();

		const response = {
			message: 'Lobby Joined',
			success: true,
			currentLobbyTeams: currentLobbyTeams,
			currentUserTeam: currentUserTeam,
			currentLobbyTeamsExcludeUser: currentLobbyTeamsExcludeUser,
			currentUserJoined: true
		};
		res.status(200).json(response);
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
