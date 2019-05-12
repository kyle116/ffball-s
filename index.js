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
  Lobby = require('./models/Lobby'),
  List = require('./models/List'),
  Team = require('./models/Team'),
  Player = require('./models/Player'),
  lobbies = require('./routes/api/lobbies'),
  users = require('./routes/api/users'),
  socket = require('socket.io');

// MongoDB Connection
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, { useMongoClient: true }, (err) => {
  console.log(err || 'connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api/lobbies', lobbies);
app.use('/api/users', users);

// Port
var server = app.listen(PORT, function(){
    console.log(`server is litening on port ${PORT}`);
});
var io = socket(server);
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('connection', function(data){
      io.emit('connection', data);
    })

    socket.on('TEST_SOCKET', function(data){
      io.emit('RECEIVE_MESSAGE', data);
    })
});
// app.listen(PORT, () => {
//   console.log(`server is litening on port ${PORT}`);
// })