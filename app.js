var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//env
dotenv.config({ path: './config.env' });
const DB = env.process.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);
//連接資料庫
mongoose
  .connect(DB)
  .then(() => {
    console.log('connect success');
  })
  .catch((err) => {
    console.log('connect faild', err);
  });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
