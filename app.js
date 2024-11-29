var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var app = express();

// view engine setup
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/tasks');

app.use('/', indexRouter);
app.use('/api/tasks', apiRouter);

module.exports = app;
