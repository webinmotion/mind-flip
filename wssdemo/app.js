var path = require('path');
var logger = require('morgan');
var express = require('express');

var router = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(process.cwd(), 'public')));

app.use('/api', router);

module.exports = app;
