var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//env
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
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

var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/auth', authRouter);

// 404 錯誤
app.use(function (req, res, next) {
  res.status(404).json({
    status: 'error',
    message: 'page not found',
  });
});

module.exports = app;
