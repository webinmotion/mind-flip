const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const errors = require('./middleware/error-handler');
const contentDir = process.env.CONTENT_DIR;
const app = express();

app.use(errors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, contentDir.trim())));
app.use(cors());
app.use('/', routes);

module.exports = app;
