const
  express = require('express'),
  app = express()
  dotenv = require('dotenv').load(),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  cors = require('cors'),
  PORT = process.env.PORT || 3001,
  token = process.env.TOKEN,
  client = yelp.client(token),
  User = require('./models/User'),
  Business = require('./models/Business')
  
  
  
  
  
  
