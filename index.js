const
  express = require('express'),
  app = express(),
  dotenv = require('dotenv').load(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  cors = require('cors'),
  PORT = process.env.PORT || 3001,
  token = process.env.TOKEN,
  mongoUrl = (process.env.MONGO_URL || 'mongodb://localhost/ffball-s'),
  Lobby = require('./Lobby'),
  List = require('./List'),
  Team = require('./Team'),
  Player = require('./Player')
  
// MongoDB Connection
mongoose.connect(mongoUrl, (err) => {
  console.log(err || 'connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());



// Routes
app.get('/', (req, res) => {
  res.json({message: 'Root Route'});
})

app.route('/lobby')
  .get((req, res) =>{
    Lobby.find({}, (err, lobbies) =>{
      res.json(lobbies);
    })
  })
  .post((req, res) => {
    Lobby.create(req.body, (err, lobby) =>{
      res.json({success: true, message: "Lobby Created", lobby});
    })
  })

app.route('/lobby/:id')
  .get((req, res) => {
    Lobby.findById(req.params.id, (err, lobby) => {
      res.json(lobby);
    })
  })

// Port
app.listen(PORT, () => {
  console.log(`server is litening on port ${PORT}`);
})
