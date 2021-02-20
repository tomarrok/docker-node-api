const express = require('express');
const app = express();

// Require and configure dotenv
require('dotenv').config()

// Load App config
const config = require('./config/app.config');

// Globales variables
const REST_API_NAME = config.REST_API_NAME || process.env.REST_API_NAME;
const REST_API_PORT = config.REST_API_PORT || process.env.REST_API_PORT;

// ROOT
app.get('/', (req, res) => {
    res.send(`Welcome to ${REST_API_NAME}`);
});

// Listening to the application
app.listen(REST_API_PORT, () => {
    console.log(`${REST_API_NAME} is listening on port ${REST_API_PORT}`);
});
