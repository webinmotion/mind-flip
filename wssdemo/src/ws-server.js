#!/usr/bin/env node

/**
 * Load env variables
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), ".env.local") });

/**
 * Module dependencies.
 */

var app = require('../app');
var http = require('http');
var attach = require('./ws-attach');

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Attach websocket to server
 */

attach(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
});
