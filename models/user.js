const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    name: {
      type: String,
      required: [true, '名稱必填'],
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    email: {
      type: String,
      default: [true, '信箱必填'],
      index: { unique: true },
    },
    gender: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
);

const User = mongoose.model('User', schema);

module.exports = User;
