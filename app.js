var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var routes = require('./routes');
var errors = require('./middleware/error-handler');
var contentDir = process.env.CONTENT_DIR;
var app = express();

app.use(errors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, contentDir.trim())));
app.use(cors());
app.use('/', routes);

module.exports = app;
