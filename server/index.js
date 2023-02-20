// #######################################################################
// index.js

const express = require('express');
const mongoose = require('mongoose');
const { init, InputValidationError } = require('openapi-validator-middleware');

const routes = require('./routes');

// initialize validation by pointing the API docs
init('./specs/api.yml');

const app = express();

const API_VERSION = '/api/v1';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/test';
const PORT = process.env.PORT || 3001;

// #######################################################################
// middleware
app.use(express.json()); // parse JSON bodies
// app.use(express.urlencoded()); // parse URL-encoded bodies

// #######################################################################
// routes
app.use(API_VERSION, routes.root);
app.use(`${API_VERSION}/stories`, routes.stories);

// catch all errors middleware
app.use((err, req, res, next) => {
  // validation error catch all
  if (err instanceof InputValidationError) {
    return res.status(400).json({ message: 'Validation error', details: err.errors });
  }
  return res.status(400).json({ message: err.message });
});

// #######################################################################
// database
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// #######################################################################

// eslint-disable-next-line no-console
const log = (msg, ...arg) => console.log(msg, arg);

mongoose.connection.on('connected', () => {
  log(`Connected to ${MONGO_URL}`);
  app.listen(PORT, () => log(`Server ready http://localhost:${PORT}`));
});

// when Node process ends, close the Mongoose connection
const gracefulExit = () => {
  mongoose.connection.close(() => {
    log('Mongoose connection is now disconnected through app termination');
    process.exit(0);
  });
};
// connection throws an error
mongoose.connection.on('error', (err) => {
  log('Failed to connect to DB on startup ', err);
});

// connection is disconnected
mongoose.connection.on('disconnected', () => {
  log('Mongoose default connection to DB : disconnected');
});

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
