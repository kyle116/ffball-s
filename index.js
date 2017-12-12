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
  mongoUrl = (process.env.MONGO_URL || 'mongodb://localhost/ffball-s')

// MongoDB Connection
mongoose.connect(mongoUrl, (err) => {
  console.log(err || 'connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

// Port
app.listen(PORT, () => {
  console.log(`server is litening on port ${PORT}`)
})
